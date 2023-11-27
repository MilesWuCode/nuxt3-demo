export function useShareLink(platform: string, url: string) {
  let shareUrl = ''

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url,
      )}`
      break
    case 'line':
      shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        url,
      )}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        url,
      )}`
      break
    case 'pinterest':
      shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url,
      )}`
      break
    case 'reddit':
      shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}`
      break
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
      break
  }

  const open = () => {
    const width = 600
    const height = 600
    const top = (window.screen.height - height) / 2
    const left = (window.screen.width - width) / 2

    window.open(
      shareUrl,
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`,
    )
  }

  return open
}
