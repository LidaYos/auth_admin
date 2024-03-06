export const focus = (el: {
[x: string]: any; focus: () => void 
} ) => {
    if (el.querySelector && el.querySelector("input")) {
        el.querySelector("input")?.focus(); // 在登录页调用 el.querySelector("input")?.focus()
      } else if (el.focus) {
        el.focus(); // 在其他页面调用 el.focus()
      }
};
