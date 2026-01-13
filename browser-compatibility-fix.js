/**
 * 百度脑图浏览器兼容性补丁
 * 修复 SVG getTransformToElement 方法在新浏览器中被废弃的问题
 */

// 为 SVGElement 添加 getTransformToElement polyfill
// 这个方法在 Chrome 48+ 和其他现代浏览器中已被移除
if (typeof SVGElement !== 'undefined' && !SVGElement.prototype.getTransformToElement) {
    console.log('[兼容性补丁] 正在修复 getTransformToElement 方法...');
    
    SVGElement.prototype.getTransformToElement = function(toElement) {
        try {
            // 使用新的 API 来替代已废弃的 getTransformToElement
            // getScreenCTM() 获取从当前元素到屏幕的变换矩阵
            // inverse() 获取逆矩阵
            // multiply() 进行矩阵乘法
            return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM());
        } catch (e) {
            console.warn('[兼容性补丁] getTransformToElement 执行失败:', e);
            // 返回一个单位矩阵作为fallback
            return this.ownerSVGElement.createSVGMatrix();
        }
    };
    
    console.log('[兼容性补丁] getTransformToElement 方法已修复!');
}

// 确保页面完全加载后再初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('[兼容性补丁] 页面已加载完成');
    });
}

console.log('[兼容性补丁] 浏览器兼容性补丁已应用');
