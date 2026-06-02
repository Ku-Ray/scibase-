#!/usr/bin/env python3
"""
PostToolUse hook：src/lib/data.ts が編集された時に
妊娠/授乳 contraindications 網羅性 audit を発火する thin wrapper。

stdin で Claude Code が JSON を渡してくる：
  {"tool_input": {"file_path": "..."}, ...}

agescience の src/lib/data.ts が編集された時のみ audit を回し、
fallback 未登録の漏れがあれば stderr に警告を出して exit 1（commit ブロックでなく Claude が修正可能な warning）。
"""
import json
import os
import sys
import subprocess

try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(0)

tool_input = data.get('tool_input', {}) or {}
file_path = tool_input.get('file_path', '') or ''

# agescience の data.ts が対象でなければ何もしない
if not file_path.endswith('/src/lib/data.ts'):
    sys.exit(0)

# audit script のパス（このフックは agescience/.claude/hooks/ にあるので 2 つ上が project root）
project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
audit_script = os.path.join(project_root, 'scripts', 'audit_pregnancy_contraindications.py')

if not os.path.exists(audit_script):
    sys.exit(0)

result = subprocess.run(
    ['python3', audit_script],
    capture_output=True,
    text=True,
)

if result.returncode != 0:
    # 失敗時（fallback 未登録の漏れあり）：警告を stderr に
    sys.stderr.write('\n⚠️  data.ts の妊娠/授乳 contraindications 監査で漏れを検出しました：\n')
    sys.stderr.write(result.stdout[-1500:])
    sys.stderr.write('\n→ src/components/AnalyzerDeepMode.tsx の PREGNANCY_HERB_FALLBACK に追加するか、\n')
    sys.stderr.write('  該当成分の data.ts contraindications に「妊娠中・授乳中」を追記してください。\n')
    sys.exit(1)

sys.exit(0)
