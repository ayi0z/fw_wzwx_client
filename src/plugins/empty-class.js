export default {
    install(Vue, opt) {
        Vue.directive('empty-class', {
            componentUpdated: function (el, binding, vnode) {
                check(el, binding, vnode)
                el.addEventListener("change", function () { check(el, binding, vnode) });

                function seeVal(obj, key){
                    try {
                        return new Function('da', 'return da.'+key)(obj)
                    } catch (error) {
                        return undefined
                    }
                }

                function check(el, binding, vnode) {
                    let elValue = el.value
                    let vmo = vnode.data.directives.find(d=>d.rawName == 'v-model');
                    if(vmo){
                        let vmoExp = vmo.expression
                        if(vmoExp){
                            elValue = seeVal(vnode.context, vmoExp) || vmo.value
                        }
                    }

                    let classname = binding.value, 
                        isEmpty = elValue && elValue.toString().trim()

                    if (!isEmpty) {
                        el.classList.add(classname)
                    } else {
                        el.classList.remove(classname)
                    }
                }
            }
        })
    }
}