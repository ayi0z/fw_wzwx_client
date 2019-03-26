export default {
    install(Vue, opt) {
        Vue.directive('re-valid', {
            inserted: function (el, binding, vnode) {
                if (!vnode.context['isReValidPassed']) {
                    vnode.context['isReValidPassed'] = function () {
                        for (let a = 0, els = document.querySelectorAll("*[data-re-valid]"); a < els.length; a++) {
                            if (els[a].getAttribute("data-re-valid") == 'false') {
                                return false
                            }
                        }
                        return true
                    }
                }

                check(el, binding, vnode)
                el.addEventListener("change", function () { check(el, binding, vnode) });

                function check(el, binding, vnode) {
                    //binding.value 可能是 function, {}, 或正则字面量表达式
                    if (typeof (binding.value) == 'function') {
                        binding.value(el, binding, vnode)
                    } else {
                        let { regexp, h } = binding.value || {}
                        regexp = regexp || (Object.prototype.toString.call(binding.value) == '[object RegExp]' ? binding.value : undefined)
                        let passed = !regexp || regexp.test(el.value);

                        const isrequired = passed && el.getAttribute('required')
                        passed = isrequired ? (el.value && el.value.trim()) : passed
                        // 校验结果写入 el 的data属性
                        el.setAttribute('data-re-valid', passed || false)

                        // 指令参数指定了校验不通过时的classname，如果指令参数没有设置，则添加默认classname
                        const errcss = binding.arg || 're-valid-err'
                        if (!passed) {
                            el.classList.add(errcss)
                        } else {
                            el.classList.remove(errcss)
                        }

                        // h：回调函数
                        if (h) {
                            if (typeof (h) == 'function') {
                                h(passed, el, binding)
                            }
                        }
                    }
                }
            }
        })
    }
}