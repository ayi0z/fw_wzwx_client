export default {
    install(Vue) {
        Vue.directive('re-valid', {
            inserted:function (el, binding, vnode) {
                if (!vnode.context['isReValidPassed']) {
                    vnode.context['isReValidPassed'] = function () {
                        for (let a = 0, els = document.querySelectorAll("*[data-re-valid]"); a < els.length; a++) {
                            if(els[a].offsetParent != null){
                                if (els[a].getAttribute("data-re-valid") == 'false') {
                                    return false
                                }
                            }
                        }
                        return true
                    }
                }

                binding.def.componentUpdated(el, binding, vnode)
            },
            componentUpdated: function (el, binding, vnode) {
                check(el, binding, vnode)
                // el.addEventListener("change", function () { check(el, binding, vnode) });

                function seeVal(obj, key){
                    try {
                        return new Function('da', 'return da.'+key)(obj)
                    } catch (error) {
                        return undefined
                    }
                }

                function check(el, binding, vnode) {
                    //binding.value 可能是 function, {}, 或正则字面量表达式
                    if (typeof (binding.value) == 'function') {
                        binding.value(el, binding, vnode)
                    } else {
                        let { regexp, h } = binding.value || {}
                        regexp = regexp || (Object.prototype.toString.call(binding.value) == '[object RegExp]' ? binding.value : undefined)
                        
                        let elValue = el.value
                        let vmo = vnode.data.directives.find(d=>d.rawName == 'v-model');
                        if(vmo){
                            let vmoExp = vmo.expression
                            if(vmoExp){
                                elValue = seeVal(vnode.context, vmoExp)
                            }
                        }
                                            
                        let passed = !regexp || regexp.test(elValue);

                        const isrequired = passed && el.getAttribute('required')
                        passed = isrequired ? (elValue && elValue.toString().trim()) : passed

                        elValue = elValue == null ? "" : elValue
                        const minlen = passed && el.getAttribute('minlength')
                        passed = minlen ? elValue.replace(/[^\x00-\xff]/g, 'aa').length >= minlen : passed

                        const maxlen = passed && el.getAttribute('maxlength')
                        passed = maxlen ? elValue.replace(/[^\x00-\xff]/g, 'aa').length <= maxlen : passed

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