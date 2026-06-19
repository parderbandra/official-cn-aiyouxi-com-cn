// assets/content-map.js

const siteConfig = {
  baseUrl: "https://official-cn-aiyouxi.com.cn",
  siteName: "爱游戏",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "home",
    title: "首页",
    tags: ["爱游戏", "最新", "推荐"],
    keywords: ["爱游戏官网", "游戏平台", "首页"]
  },
  {
    id: "games",
    title: "游戏库",
    tags: ["爱游戏", "游戏", "分类"],
    keywords: ["游戏列表", "热门游戏", "新游"]
  },
  {
    id: "news",
    title: "新闻动态",
    tags: ["爱游戏", "新闻", "公告"],
    keywords: ["游戏新闻", "更新公告", "活动"]
  },
  {
    id: "support",
    title: "客服支持",
    tags: ["爱游戏", "帮助", "FAQ"],
    keywords: ["客服", "常见问题", "联系"]
  }
];

const tagIndex = {};

function buildTagIndex(sections) {
  for (const section of sections) {
    for (const tag of section.tags) {
      if (!tagIndex[tag]) {
        tagIndex[tag] = [];
      }
      tagIndex[tag].push(section.id);
    }
  }
}

buildTagIndex(contentSections);

function filterByTag(tag) {
  const sectionIds = tagIndex[tag];
  if (!sectionIds) return [];

  return sectionIds
    .map(id => contentSections.find(s => s.id === id))
    .filter(Boolean);
}

function filterByKeyword(query) {
  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const section of contentSections) {
    const matchesKeyword = section.keywords.some(kw =>
      kw.toLowerCase().includes(lowerQuery)
    );
    const matchesTag = section.tags.some(t =>
      t.toLowerCase().includes(lowerQuery)
    );

    if (matchesKeyword || matchesTag) {
      results.push(section);
    }
  }

  return results;
}

function searchContent(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const tagResults = filterByTag(trimmed);
  const keywordResults = filterByKeyword(trimmed);

  const combined = new Map();
  for (const item of tagResults) {
    combined.set(item.id, item);
  }
  for (const item of keywordResults) {
    combined.set(item.id, item);
  }

  return Array.from(combined.values());
}

function getSectionById(id) {
  return contentSections.find(s => s.id === id) || null;
}

function getAllTags() {
  return Object.keys(tagIndex).sort();
}

function getAllSectionTitles() {
  return contentSections.map(s => s.title);
}

// Example usage (commented out to avoid side effects)
// console.log(searchContent("爱游戏"));
// console.log(filterByTag("新闻"));

export {
  siteConfig,
  contentSections,
  filterByTag,
  filterByKeyword,
  searchContent,
  getSectionById,
  getAllTags,
  getAllSectionTitles
};