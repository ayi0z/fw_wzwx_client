export default {
    install(Vue){
        Vue.prototype.fixInputBug = function(){
            let els = document.querySelectorAll('input,select,textarea');
            for(let el of els){
                el.addEventListener('blur', function () {
                    window.setTimeout(function () {
                        document.activeElement.scrollIntoViewIfNeeded();
                    }, 0);
                })
            }
        }

        Vue.mixin({
            mounted(){
                let els = document.querySelectorAll('input,select,textarea');
                for(let el of els){
                    el.addEventListener('blur', function () {
                        window.setTimeout(function () {
                            document.activeElement.scrollIntoViewIfNeeded();
                        }, 0);
                    })
                }
            }
        })
    }
}