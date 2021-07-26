let params = new URL(document.location).searchParams.get("kw");
params = params.replace(/-/g, " ");
console.log(params);

// 