async (page) => {
  // 在既有主题页面内替换插件资源和 API 响应，不安装插件、不提交真实问答或图谱互动。
  const origin = 'http://localhost:8090';
  // run-code 从插件根目录执行；相对路径避免把开发者主机目录写死在可复用检查里。
  const root = '.';
  const checks = [];
  const errors = [];
  const requests = [];
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  let summaryMode = 'ready';
  let delayConfig = false;
  let delayedConfigRelease;
  let releaseOldSummary;
  let roleMode = 'rag';
  const captureScreenshots = false;
  const summary = '本次试航围绕星港导读、昼夜同步与站内检索展开。领航员以矢量舱体守望航线，文章摘要与洞察星图复用主题色板；访客可以沿原有跃迁入口进入正文，再追溯每一段信号的来源。';
  const graph = {
    spec: {
      postMetadataName: 'stellar-check', postTitle: '星港试航记录', schemaVersion: 5,
      root: { id: 'root', title: '星港试航记录', kind: 'root', summary: '本舱信号总览' },
      nodes: [
        { id: 'tl-1', title: '进舱缘起', kind: 'tl', summary: '沿用站点昼夜和字体口径，让导读自然融入正文。', payload: { items: ['星港变量同源', '可选配置保留'] } },
        { id: 'tl-2', title: '轨道标定', kind: 'tl', summary: 'SVG 领航员无需精灵图下载，依然支持拖动和问答。' },
        { id: 'tl-3', title: '返航清单', kind: 'tl', summary: '换舱及时清理异步任务，旧响应不覆盖当前文章。' },
        { id: 'dl-1', title: '昼夜对照', kind: 'dl', summary: '青紫信标和阅读灰阶随导航切换，深夜与白昼均可辨识。' },
        { id: 'dl-2', title: '受控验证', kind: 'dl', summary: '此页面的 AI 数据为测试响应，没有发起实际模型调用。' },
      ],
      edges: [
        { from: 'root', to: 'tl-1', type: 'contains' }, { from: 'root', to: 'tl-2', type: 'contains' },
        { from: 'root', to: 'tl-3', type: 'contains' }, { from: 'tl-1', to: 'dl-1', type: 'expands' },
        { from: 'tl-2', to: 'dl-2', type: 'supports' },
      ],
    },
  };
  const config = {
    logo: 'icon.svg', summaryTitle: '文章摘要', gptName: '智阅GPT', typeSpeed: 2,
    darkSelector: '', uiStyle: 'stellar', fixedTone: 'violet', fixedDensity: 'compact',
    themeName: 'custom', theme: {}, typewriter: false, readingDefaultCollapsed: false,
  };
  await page.unrouteAll({ behavior: 'ignoreErrors' });
  page.on('pageerror', (error) => errors.push(error.stack || String(error)));
  page.on('request', (request) => requests.push(request.url()));
  await page.route('**/plugins/summaraidGPT/assets/static/ArticleSummary.js*', (route) => route.fulfill({ path: `${root}/src/main/resources/static/ArticleSummary.js`, contentType: 'application/javascript' }));
  await page.route('**/plugins/summaraidGPT/assets/static/RagAssistant.js*', (route) => route.fulfill({ path: `${root}/src/main/resources/static/RagAssistant.js`, contentType: 'application/javascript' }));
  await page.route('**/apis/api.summary.summaraidgpt.lik.cc/v1alpha1/**', async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/summaryConfig')) {
      if (delayConfig) await new Promise((resolve) => { delayedConfigRelease = resolve; });
      return route.fulfill({ json: config });
    }
    if (path.endsWith('/dialogConfig')) return route.fulfill({ json: {
      assistantName: '智阅助手', assistantAvatar: '/plugins/summaraidGPT/assets/static/icon.svg',
      displayMode: roleMode, ragEnabled: true, styleConfig: { stylePreset: 'stellar', colorMode: 'light' },
      petSize: 96, buttonPosition: 'right', horizontalOffset: 26, verticalOffset: 24,
      pet: { enabled: true, spritesheetUrl: '/do-not-load/old-pet.webp' },
      access: { mode: 'anonymous_chat', allowAnonymous: true, agentAllowed: false, authenticated: false },
    } });
    if (path.endsWith('/updateContent')) {
      if (route.request().postData() === 'late-old') await new Promise((resolve) => { releaseOldSummary = resolve; });
      if (summaryMode === 'failed') return route.fulfill({ status: 503, json: { message: '受控信号中断' } });
      if (summaryMode === 'missing') return route.fulfill({ json: { success: false, message: '未找到摘要内容', summaryContent: '未找到摘要内容', blackList: false } });
      return route.fulfill({ json: { summaryContent: summaryMode === 'empty' ? '' : route.request().postData() === 'late-old' ? '旧文章信号不得覆盖' : summary } });
    }
    if (path.includes('/articleReadings/')) return route.fulfill({ json: graph });
    if (path.endsWith('/ragAskStream')) {
      const body = [
        { type: 'delta', delta: '星港应答已接通。\n\n**昼夜同步**与本地 SVG 角色已就绪，可继续追溯本舱信号。' },
        { type: 'sources', sources: [{ id: 'fixture-source', title: '星港试航记录', url: '/archives/stellar-check', sourceType: 'post', score: 0.82 }] },
        { type: 'done' },
      ].map((event) => `data: ${JSON.stringify(event)}\n\n`).join('');
      return route.fulfill({ body, contentType: 'text/event-stream' });
    }
    if (path.endsWith('/conversation')) return route.fulfill({ json: { success: true, response: '本舱星图采用同源变量，昼夜一致。' } });
    // 其余所有接口均受控返回，确保不会向真实站点写入互动或会话。
    return route.fulfill({ json: {} });
  });
  const boot = () => page.waitForFunction(() => !document.documentElement.classList.contains('boot-arrive'), null, { timeout: 18000 });
  const pet = () => page.locator('summaraid-rag-assistant .pet-button');
  const waitPet = () => pet().waitFor({ state: 'visible' });
  const waitSummary = () => page.waitForFunction(() => {
    const element = document.querySelector('likcc-article-summary');
    return element?.shadowRoot?.textContent?.includes('本次试航');
  });
  const setScheme = async (scheme) => {
    await page.evaluate((value) => document.documentElement.setAttribute('data-scheme', value), scheme);
    await page.waitForFunction((value) => document.querySelector('summaraid-rag-assistant')?.getAttribute('data-assistant-scheme') === value, scheme);
  };
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(origin);
  // 每次试航重置本浏览器的拖动记忆，避免前一轮拖到顶部遮挡主题返航按钮。
  await page.evaluate(() => localStorage.removeItem('likcc_summaraidgpt_rag_assistant_position'));
  await page.goto(origin);
  await boot();
  await waitPet();
  const fixture = await page.evaluate(() => {
    const reader = document.getElementById('reader').cloneNode(true);
    reader.querySelector('#readerBody').innerHTML = `<header class="reader-heading"><h1>星港试航记录</h1><div class="reader-meta"><span class="rm-chip"><em>LOG</em>受控试航 · 不写入站点</span></div></header><article class="reader-content"><ai-summaraidGPT name="stellar-check"></ai-summaraidGPT><ai-summaraidGPT-reading name="stellar-check"></ai-summaraidGPT-reading><h2>舱段记录</h2><p>沿着原有航线，星枢领航员将本站资料与阅读现场连接起来。</p></article>`;
    // 独立正文不加载首页调度台 data/app：它们依赖首页列表 DOM，真实 post 模板也不加载。
    const scripts = Array.from(document.querySelectorAll('body > script[src]'))
      .filter((script) => !/\/(data|app)\.js(?:\?|$)/.test(script.src))
      .map((script) => script.outerHTML).join('');
    const header = document.querySelector('header').cloneNode(true);
    // 受控正文不复用首页已初始化的时计数字，避免复制运行时 DOM 后再次接线叠字。
    header.querySelectorAll('.nav-clock').forEach((clock) => clock.remove());
    return `<!doctype html><html lang="zh-CN" data-scheme="dark"><head>${document.head.innerHTML}</head><body class="reader-on">${header.outerHTML}<main>${reader.outerHTML}</main>${document.getElementById('warp')?.outerHTML || ''}${scripts}</body></html>`;
  });
  await page.route('**/archives/stellar-check*', (route) => route.fulfill({ body: fixture, contentType: 'text/html' }));
  // 真实主题首页入口与原有跃迁层，目的文章是受控正文，不触发 Halo 的自动图谱生成。
  await page.evaluate(() => {
    const link = document.querySelector('#stream a[data-main]');
    link.href = '/archives/stellar-check';
    const card = link.closest('[data-name]');
    card.dataset.url = '/archives/stellar-check'; card.dataset.cover = ''; card.dataset.title = '星港试航记录';
  });
  await page.locator('#stream a[data-main]').first().click();
  await waitSummary();
  await page.waitForFunction(() => document.body.classList.contains('reader-on') && !document.querySelector('#warp').classList.contains('on'), null, { timeout: 25000 });
  assert(await page.locator('likcc-article-summary').count() === 1, '跃迁摘要重复挂载');
  assert(await page.locator('likcc-article-reading').count() === 1, '跃迁图谱重复挂载');
  checks.push('真实主题首页跃迁：摘要/图谱各挂载一份，未复制跃迁逻辑');
  await page.locator('#readerBack').click();
  await page.waitForFunction(() => !document.body.classList.contains('reader-on') && !document.querySelector('#warp').classList.contains('on'), null, { timeout: 12000 });
  await page.locator('#stream a[data-main]').first().click();
  await waitSummary();
  checks.push('返航与二次入舱：组件释放后重新挂载');
  await page.goto(`${origin}/archives/stellar-check`);
  await boot();
  await waitPet();
  await waitSummary();
  await page.locator('likcc-article-reading .insight-graph').waitFor({ state: 'visible' });
  checks.push('受控独立正文：摘要与洞察图谱均可渲染');
  await page.emulateMedia({ colorScheme: 'light' });
  await setScheme('dark');
  assert(await page.locator('summaraid-rag-assistant .stellar-drone').count() === 1, '没有渲染 SVG 角色');
  assert(!requests.some((url) => url.includes('/do-not-load/old-pet.webp')), '星港模式错误请求了旧精灵图');
  assert(await page.evaluate(() => document.querySelector('summaraid-rag-assistant').petAnimationTimer) === 0, 'SVG 启动了逐帧动画');
  assert(await page.locator('summaraid-rag-assistant').getAttribute('data-assistant-style') === 'stellar', '助手没有星港标记');
  checks.push('星港 SVG 不请求旧宠物、无逐帧定时器，显式深夜优先系统浅色');
  await pet().click();
  const panelText = await page.locator('summaraid-rag-assistant .pet-panel').innerText();
  assert(panelText.includes('星枢领航员') && !panelText.includes('智阅助手'), '名称或欢迎语仍是旧默认');
  assert(await page.locator('summaraid-rag-assistant .pet-panel-avatar .stellar-emblem').count() === 1, '问答头像没有替换');
  await page.locator('summaraid-rag-assistant .pet-composer-input').fill('请梳理本舱记录');
  await page.locator('summaraid-rag-assistant .pet-send').click();
  await page.locator('summaraid-rag-assistant .pet-panel-thread').waitFor({ state: 'visible' });
  await page.waitForFunction(() => !document.querySelector('summaraid-rag-assistant').streaming);
  if (captureScreenshots) await pet().screenshot({ path: `${root}/output/playwright/stellar-drone.png` });
  checks.push('名称、欢迎语、头像、受控问答与来源展示');
  const lifecycleResult = await page.evaluate(async () => {
    const h = document.querySelector('summaraid-rag-assistant');
    const original = h.askRagStream;
    const pending = [];
    h.askRagStream = (_question, _id, controller) => new Promise((resolve, reject) => pending.push({ resolve, reject, controller }));
    const oldRequest = h.submitQuestion('旧航次');
    await h.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    h.stopCurrentResponse();
    const newRequest = h.submitQuestion('新航次');
    await h.updateComplete;
    await new Promise((resolve) => setTimeout(resolve, 0));
    const current = h.abortController;
    pending[0].reject(new DOMException('旧航次已停止', 'AbortError'));
    await oldRequest;
    const protectedCurrent = h.streaming && h.abortController === current;
    const noFalseError = !h.messages.some((message) => message.error);
    h.stopCurrentResponse();
    const canStopNew = current.signal.aborted;
    pending[1].resolve();
    await newRequest;
    h.askRagStream = original;
    return { protectedCurrent, noFalseError, canStopNew };
  });
  assert(lifecycleResult.protectedCurrent && lifecycleResult.noFalseError && lifecycleResult.canStopNew, '停止后立即再问的请求句柄被旧请求清空');
  checks.push('停止后立即再问：旧请求收尾不清掉新请求，新航次仍可停止');
  for (const [device, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    await page.setViewportSize({ width, height });
    for (const scheme of ['dark', 'light']) {
      await page.emulateMedia({ colorScheme: scheme === 'dark' ? 'light' : 'dark' });
      await setScheme(scheme);
      await page.evaluate(async () => { window.scrollTo(0, 0); const assistant = document.querySelector('summaraid-rag-assistant'); assistant.clampCurrentFloatingPosition(); assistant.open = false; assistant.petPanelOpen = true; await assistant.updateComplete; });
      await page.waitForFunction(() => !document.querySelector('summaraid-rag-assistant').shadowRoot.querySelector('.pet-panel').getAnimations().some((animation) => animation.playState === 'running'));
      if (captureScreenshots) await page.screenshot({ path: `${root}/output/playwright/stellar-${device}-${scheme}.png` });
      const metrics = await page.evaluate(() => {
        const assistant = document.querySelector('summaraid-rag-assistant');
        const style = getComputedStyle(assistant);
        const panel = assistant.shadowRoot.querySelector('.pet-panel');
        const rect = panel.getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth > innerWidth + 1, left: rect.left, right: rect.right, top: rect.top, color: style.color, z: style.zIndex, width: innerWidth };
      });
      assert(!metrics.overflow, `${device}/${scheme} 页面横向溢出`);
      assert(metrics.left >= -1 && metrics.right <= metrics.width + 1 && metrics.top >= -1, `${device}/${scheme} 小窗超出屏幕`);
      assert(metrics.z === '280', '助手穿透主题遮罩');
      await page.locator('summaraid-rag-assistant button[aria-label="全屏会话"]').click();
      // 等过场完成后再拍摄；不把动画第一帧的透明度当成最终视觉。
      await page.waitForFunction(() => {
        const root = document.querySelector('summaraid-rag-assistant').shadowRoot;
        return ['.pet-stage', '.pet-stage-backdrop'].every((selector) => !root.querySelector(selector).getAnimations().some((animation) => animation.playState === 'running'));
      });
      const stageBox = await page.locator('summaraid-rag-assistant .pet-stage-close').boundingBox();
      assert(stageBox.x >= 0 && stageBox.x + stageBox.width <= width + 1, `${device}/${scheme} 全屏关闭按钮超出视口`);
      if (captureScreenshots) await page.screenshot({ path: `${root}/output/playwright/stellar-stage-${device}-${scheme}.png` });
      await page.locator('summaraid-rag-assistant .pet-stage-close').click();
      checks.push(`${device}/${scheme}：小窗/全屏与布局验收`);
    }
  }
  // 独立验证图谱，无摘要占位。
  await page.evaluate(() => {
    document.querySelector('#readerBody .reader-content').innerHTML = '<ai-summaraidGPT-reading name="reading-only"></ai-summaraidGPT-reading>';
  });
  await page.locator('likcc-article-reading .insight-graph').waitFor({ state: 'visible' });
  assert(await page.locator('likcc-article-summary').count() === 0, '独立图谱错误创建摘要');
  checks.push('摘要 UI 缺席时，图谱独立使用星港风格');
  const readingStates = await page.evaluate(async () => {
    const reading = document.querySelector('likcc-article-reading');
    reading.notGenerated = true;
    reading.postName = '';
    await reading.updateComplete;
    const blankCleared = !reading.notGenerated && !reading.reading && !reading.pollTimer && reading.errorMessage === '文章名称为空';
    reading.notGenerated = true;
    reading.pollAttempts = 600;
    reading.scheduleExistingPoll();
    await reading.updateComplete;
    return { blankCleared, budgetEnded: !reading.notGenerated && reading.errorMessage.includes('刷新') && !reading.pollTimer };
  });
  assert(readingStates.blankCleared && readingStates.budgetEnded, '图谱空文章或耗尽轮询后仍假报自动刷新');
  checks.push('图谱空文章清理与轮询耗尽明确提示，不假报自动刷新');
  // 配置请求在途时整批换舱，后到的新占位不能遗留。
  delayConfig = true;
  await page.evaluate(() => { document.querySelector('#readerBody .reader-content').innerHTML = '<ai-summaraidGPT name="pending-old"></ai-summaraidGPT>'; });
  await page.waitForFunction(() => document.querySelector('ai-summaraidGPT')?.getAttribute('data-summary-lit-mounted') === 'true');
  await page.evaluate(() => { document.querySelector('#readerBody .reader-content').innerHTML = '<ai-summaraidGPT name="pending-new"></ai-summaraidGPT>'; });
  delayConfig = false;
  delayedConfigRelease();
  await waitSummary();
  assert(await page.locator('ai-summaraidGPT').count() === 0, '配置在途换舱后新占位未挂载');
  checks.push('配置请求在途换舱：只挂载新占位，不丢失新文章');
  await page.evaluate(() => { const element = document.querySelector('likcc-article-summary'); element.postName = 'late-old'; });
  await page.waitForFunction(() => document.querySelector('likcc-article-summary').postName === 'late-old');
  await page.waitForFunction(() => document.querySelector('likcc-article-summary').loading);
  const oldRequestDeadline = Date.now() + 5000;
  while (!releaseOldSummary && Date.now() < oldRequestDeadline) await new Promise((resolve) => setTimeout(resolve, 20));
  assert(releaseOldSummary, '未捕获迟到摘要请求');
  // 这里不等待旧响应，切换新文章后将迟到请求放行。
  await page.evaluate(() => { document.querySelector('likcc-article-summary').postName = 'late-new'; });
  await waitSummary();
  if (releaseOldSummary) releaseOldSummary();
  assert(!await page.locator('likcc-article-summary').innerText().then((text) => text.includes('旧文章信号不得覆盖')), '迟到响应覆盖新文章');
  checks.push('摘要迟到响应不会覆盖新文章');
  for (const mode of ['empty', 'missing', 'failed']) {
    summaryMode = mode;
    await page.evaluate((value) => { document.querySelector('likcc-article-summary').postName = value; }, mode);
    const expected = mode === 'failed' ? '导读信号暂时中断，请稍后重试' : '尚未收到导读信号';
    await page.waitForFunction((text) => document.querySelector('likcc-article-summary')?.shadowRoot.textContent.includes(text), expected);
    checks.push(`摘要${mode}状态文案`);
  }
  summaryMode = 'ready';
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => { const element = document.querySelector('likcc-article-summary'); element.typewriter = true; element.postName = 'reduced'; });
  await waitSummary();
  assert(await page.evaluate(() => !document.querySelector('likcc-article-summary').typing), '减动效仍逐字输出');
  assert(await page.locator('summaraid-rag-assistant .stellar-drone').evaluate((element) => getComputedStyle(element).animationName) === 'none', '减动效角色仍悬浮');
  checks.push('减弱动态效果：摘要直接展示，SVG 静态');
  // 用真实按钮触发复制，明确禁用现代接口，旧式命令使用受控返回并核对清理。
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    window.__stellarCopyCalls = 0;
    document.execCommand = (command) => { if (command === 'copy') window.__stellarCopyCalls += 1; return true; };
  });
  await page.evaluate(async () => { const h = document.querySelector('summaraid-rag-assistant'); h.open = false; h.petPanelOpen = true; await h.updateComplete; });
  await page.locator('summaraid-rag-assistant .pet-panel-thread button[title="复制"]').first().click();
  assert(await page.evaluate(() => window.__stellarCopyCalls === 1 && !document.querySelector('textarea[aria-label="复制信号文本"]')), 'HTTP 复制降级未调用或临时节点未清理');
  checks.push('真实复制按钮在 API 缺席时走旧式降级并清理文本域');
  // 拖动到顶端与视口中部后，面板仍在可见边界内。
  const bubbleBox = await pet().boundingBox();
  await page.mouse.move(bubbleBox.x + bubbleBox.width / 2, bubbleBox.y + bubbleBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(180, 150, { steps: 8 });
  await page.mouse.up();
  await page.evaluate(async () => { const h = document.querySelector('summaraid-rag-assistant'); h.petPanelOpen = true; await h.updateComplete; });
  const dragPanel = await page.locator('summaraid-rag-assistant .pet-panel').boundingBox();
  assert(dragPanel.x >= 0 && dragPanel.x + dragPanel.width <= 391 && dragPanel.y >= 0, '拖动到顶部后小窗超出视口');
  checks.push('SVG 可真实拖动，靠近顶部和中部时小窗保持视口内');
  await page.evaluate(async () => {
    const h = document.querySelector('summaraid-rag-assistant');
    const oldAvatar = h.config.assistantAvatar;
    h.config = { ...h.config, assistantAvatar: '/test-avatar-failure.png' };
    await h.updateComplete;
    const image = h.shadowRoot.querySelector('.pet-panel-avatar-image');
    image?.dispatchEvent(new Event('error'));
    h.config = { ...h.config, assistantAvatar: oldAvatar };
  });
  assert(await page.locator('summaraid-rag-assistant .pet-panel-avatar .stellar-emblem').count() === 1, '自定义头像失败后未回退星核');
  checks.push('自定义头像加载失败回退星核徽记');
  // 纯宠物口径也不依赖精灵图。
  roleMode = 'petOnly';
  await page.goto(`${origin}/archives/stellar-check`);
  await waitPet();
  await pet().click();
  assert(await page.locator('summaraid-rag-assistant .pet-panel').count() === 0, '纯宠物错误打开问答');
  checks.push('纯宠物星港角色可见，点击不打开问答');
  assert(errors.length === 0, `页面异常：${errors.join('\n')}`);
  const result = { checks, pageErrors: errors, oldPetRequests: requests.filter((url) => url.includes('/do-not-load/')), evidence: '真实主题资源 + 受控插件配置/文章/AI响应；未安装插件或写入真实会话。' };
  await page.unrouteAll({ behavior: 'ignoreErrors' });
  return result;
}
