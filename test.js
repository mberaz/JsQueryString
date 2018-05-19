var qs = {};

$(document).ready(function () {
    qs = new QueryStringHandler('htp://www.test.com?firstname=name&lastname=last&lastname=name');

    qs.InsertOrReplase('up', 'up');
    qs.InsertOrReplase('car', 'car');
    qs.InsertOrReplase('del', 'car');
    qs.InsertOrConcatList([{
        key: 'l1',
        value: 'l1'
    }, {
        key: 'l2',
        value: 'l2'
    }]);

    qs.DeleteKey('del');
    qs.RenameKey('car', 'rac');

    var returnQs = qs.ReturnQueryString();

    var testQs = qs.ReturnQueryString(function (k, v) {
        return k + "=" + v + '2';
    });

    var s = "";
});