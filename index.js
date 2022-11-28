const XmlReader = require('xml-reader');

const reader = XmlReader.create({
    emitTopLevelOnly: false
});
const xml =
    `<option name="bookmarks">
          <BookmarkState>
            <attributes>
              <entry key="url" value="/shop-app/src/main/java/com/modules/order/rest/StoreOrderController.java" />
              <entry key="line" value="259" />
            </attributes>
            <option name="description" value="@ApiOperation(value = 订单详情,notes = 订单详情)" />
            <option name="provider" value="com.intellij.ide.bookmark.providers.LineBookmarkProvider" />
          </BookmarkState>
          <BookmarkState>
            <attributes>
              <entry key="url" value="/shop-app/src/main/java/com/modules/order/rest/StoreOrderController.java" />
              <entry key="line" value="306" />
            </attributes>
            <option name="description" value="@ApiOperation(value = 订单评价,notes = 订单评价)" />
            <option name="provider" value="com.intellij.ide.bookmark.providers.LineBookmarkProvider" />
          </BookmarkState>
        </option>`;
var markDownArr = {}
reader.on('tag:BookmarkState', (data) => {
    var description = data.children[1].attributes.value;
    var children = data.children[0];
    var javaFile = children.children[0].attributes.value;
    var line = children.children[1].attributes.value;
    var host = "https://gitee.com/ayou/shop-app/blob/master";
    var url = host + javaFile + "#L" +line
    var formatDesc = description.split(",")[0].split(" ")[2];
    var fileName = javaFile.split("/")[javaFile.split("/").length - 1].split(".")[0];
    var markdown = "- ["+formatDesc+"]("+url+")  "
    if (markDownArr[fileName] != undefined){
        markDownArr[fileName].push(markdown);
    }else{
        let arr = []
        arr.push(markdown);
        markDownArr[fileName] = arr;
    }
});
xml.split('').forEach(char => reader.parse(char));

for (let key in markDownArr) {
    console.log("###",key)
    markDownArr[key].forEach(v=>{
        console.log(v);
    })
}