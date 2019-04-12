export default {
    install(Vue) {
        Vue.directive('empty-class', {
            inserted:function(el, binding, vnode){
                if(['select','input','textarea'].indexOf(el.tagName.toLowerCase())>-1){
                    el.addEventListener("change", function () { binding.def.componentUpdated(el, binding, vnode) });
                }
                binding.def.componentUpdated(el, binding, vnode)
            },
            componentUpdated: function (el, binding, vnode) {
                check(el, binding, vnode)

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
                    vmo = vmo ? vmo : vnode.data.model
                    if(vmo){
                        let vmoExp = vmo.expression
                        if(vmoExp){
                            elValue = seeVal(vnode.context, vmoExp)
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