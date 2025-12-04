import appData from './app.json';

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // 读取查询参数
    const keyword = url.searchParams.get("q");
    const name = url.searchParams.get("name");

    let result = Object.values(appData);

    // 按名称精确查询
    if (name) {
      result = result.filter(item => item.name === name);
    }
    // 按关键词模糊搜索
    else if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      result = result.filter(item => 
        item.name?.toLowerCase().includes(lowerKeyword) ||
        item.title?.toLowerCase().includes(lowerKeyword) ||
        item.desc?.toLowerCase().includes(lowerKeyword)
      );
    }

    // 输出 JSON 响应
    return new Response(JSON.stringify(result), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};