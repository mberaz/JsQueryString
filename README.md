this is a simple to handle query strings in JS

(if you need to to this in C#, check out the cs version at https://github.com/mberaz/CsQueryString)
to start using just add the file QueryStringHandler.min.js to a HTML page

if you only need to parse the query string you can use the static object
 var result = QueryStringHandlerStatic.ParseQueryString('htp://www.test.com?firstname=name&lastname=last&lastname=name',DuplicateKeyMode.Concat);

the result will be the following onject
{firstname: "name", lastname: "last,name"}

if you need to menipulate the query string:
first you need to create an instance of the parser

var qs = new QueryStringHandler('htp://www.test.com?firstname=name&lastname=last&lastname=name');

then you can use it to performe several actions 

to insert a new key value pair
qs.InsertOrReplase('up', 'up');
you can also use:
InsertOrConcat
InsertOrKeepOld

to insert several new key value pairs
qs.InsertOrConcatList([{
    key: 'l1',
    value: 'l1'
}, {
    key: 'l2',
    value: 'l2'
}]);

you can also use:
InsertOrReplaseList
InsertOrKeepOldList

to update a key
qs.UpdateKey('l2','l3');
to update a list of key
qs.UpdateList([{
    key: 'l1',
    value: 'ul1'
}, {
    key: 'l2',
    value: 'ul2'
}]);


all insert and update methots can get a DuplicateKeyMode value, this tells the method how to handle duplicates keys
the possible values are
var DuplicateKeyMode = {
    Concat: 1,
    Replase: 2,
    KeepOld: 3
}


to delete a key
qs.DeleteKey('del');
qs.DeleteKeys(['del','del2']);

to rename a key
qs.RenameKey('car', 'rac');

to get back the query string
qs.ReturnQueryString();

if you need to manipulate how the query string is created 
qs.ReturnQueryString(function (k, v) {
    return k + "=" + v + '2';
});

to parse the query string to param
qs.ParseQueryString();

