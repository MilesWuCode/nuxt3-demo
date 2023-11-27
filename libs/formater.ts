export function formatCompactNumber(number: number) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })

  return formatter.format(number)
}

// formatCompactNumber(-57) // -57
// formatCompactNumber(999) // 999
// formatCompactNumber(8_554) // 8.5K
// formatCompactNumber(150_000) // 150K
// formatCompactNumber(3_237_512) // 3.2M
// formatCompactNumber(9_782_716_897) // 9.8B
// formatCompactNumber(7_899_693_036_970) // 7.9T
