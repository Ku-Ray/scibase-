import type { Ingredient, Product } from '@/lib/types'

interface Props {
  product: Product
  ingredient: Ingredient
}

const platformDisplay: Record<Product['platform'], string> = {
  iherb: 'iherb.com',
  amazon: 'amazon.co.jp',
  cosme: '公式サイト',
}

/**
 * mybest サプリ風スペック表。
 * 形状 / サポート成分 / 1日あたり配合量 / 1日の摂取量目安 / 使用日数 / 第三者検査 / 認証
 * を表形式で整理。空フィールドは行ごと省略。
 */
export function SpecTable({ product, ingredient }: Props) {
  const dailyDose =
    product.dosageMg != null && product.unitsPerDay != null
      ? product.dosageMg * product.unitsPerDay
      : product.dosageMg ?? null

  const rows: { label: string; value: React.ReactNode }[] = []

  if (product.form) rows.push({ label: '形状', value: product.form })
  if (dailyDose != null) {
    rows.push({
      label: `1日あたりの${ingredient.nameJa}量`,
      value: `${dailyDose.toLocaleString()}${ingredient.dosageUnit?.split('/')[0] ?? 'mg'}`,
    })
  }
  if (product.unitsPerDay != null) {
    rows.push({ label: '1日の摂取量目安', value: `${product.unitsPerDay}粒` })
  }
  // 第三者検査
  if (product.heavyMetalTested && product.thirdPartyTested) {
    rows.push({ label: '第三者検査', value: '重金属＋成分量検査済' })
  } else if (product.heavyMetalTested) {
    rows.push({ label: '第三者検査', value: '重金属検査済' })
  } else if (product.thirdPartyTested) {
    rows.push({ label: '第三者検査', value: '成分量検査済' })
  }
  // 認証
  if (product.certifications && product.certifications.length > 0) {
    rows.push({ label: '認証', value: product.certifications.join('・') })
  }
  if (product.shippingNote) rows.push({ label: '配送', value: product.shippingNote })
  rows.push({ label: '出典', value: platformDisplay[product.platform] })

  if (rows.length === 0) return null

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <table className="w-full text-[12px]">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-amber-50/30' : 'bg-card'}>
              <th scope="row" className="text-left text-muted-foreground font-medium px-3 py-2 align-top w-[40%] sm:w-[35%] border-r border-border">
                {r.label}
              </th>
              <td className="text-foreground font-medium px-3 py-2 align-top">
                {r.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
