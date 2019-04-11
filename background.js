// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict'

chrome.runtime.onInstalled.addListener(() => {
  chrome.browserAction.onClicked.addListener(() => {
    const op = new Intl.Collator('en', { numeric: true, sensitivity: 'accent' })

    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      const sortedTabs = tabs.sort((a, b) => {
        const aa = new URL(a.url)
        const bb = new URL(b.url)

        return op.compare(aa.host, bb.host)
      })
      const sortedTabIds = sortedTabs
        .map((tab) => {
          console.log('tab', tab)
          return tab.id
        })
        .forEach((tabId, idx) => {
          chrome.tabs.move(tabId, { index: idx })
        })
    })
  })
})
