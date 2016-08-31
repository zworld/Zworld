
(function(w){
    //
    var Z = {};

    //添加方法
    
    //tempalte模板方法
    Z.template = function(id){

        this.tplContent = $('#'+id).html();
        this.render = function(_data){
            var self = this;
            //正则匹配${}
            var reg = new RegExp('\\$\\{[^\\{\\}]+\\}','gi');
            //模板内容匹配正则
            var arr = this.tplContent.match(reg);

            //遍历data 进行模板渲染[{},{}]
            var renderHtml = '';
            
            $.each(_data,function(i,data){
                var tplContentCopy = self.tplContent;
                $.each(arr,function(){
                    var code = this.replace(/\$\{\s*/g,'').replace(/\s*\}/g,'');
                    var rest = '';
                    try{
                        rest = eval(code);
                    }catch(e){
                        rest = '';
                    }
                    tplContentCopy = tplContentCopy.replace(this,rest)

                })
                renderHtml += tplContentCopy;
            });
            return $('#'+id).html(renderHtml);
        }

    };

    //正则

    //抛出库
    window.Z = Z;
})(window)
