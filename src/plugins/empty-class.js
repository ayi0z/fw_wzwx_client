export default {
    install(Vue, opt) {
        Vue.directive('empty-class', {
            inserted: function (el, binding) {
                check(el, binding)
                el.addEventListener("change", function () { check(el, binding) });

                function check(el, binding) {
                    let classname = binding.value, 
                        isEmpty = el.value && el.value.trim()

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