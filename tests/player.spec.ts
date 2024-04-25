import { test, expect } from '@playwright/test';

test('Deve tocar uma música', async ({ page }) => {

  const song = {
    id: 1,
    title: "Smells Like Test Script",
    artist: "Nullvana",
    description: "Nullvana",
    image: "https://raw.githubusercontent.com/qaxperience/mock/main/covers/nevertesting.jpg",
    type: "album",
    src: "https://raw.githubusercontent.com/qaxperience/mock/main/songs/nirvana.mp3"
  }

  await page.route('**/songs', route => route.fulfill({
    status: 200,
    body: JSON.stringify([song])
  }))

  const loggedUser = page.locator('.logged-user')

  await page.goto('/')
  await expect(loggedUser).toHaveText('Fernando Papito')

  const songCard = page.locator('.song').filter({ hasText: song.title })

  const play = songCard.locator('.play')
  const pause = songCard.locator('.pause')

  await play.click()
  await expect(pause).toBeVisible({ timeout: 2000 })
  await expect(play).toBeVisible({ timeout: 7000 })

  // await page.click(`//div[contains(@class,"song")]//h6[text()="${song.title}"]/..//button`)
  // await page.waitForTimeout(5000)

});



