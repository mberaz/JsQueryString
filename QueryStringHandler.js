var DuplicateKeyMode = {
    Concat: 1,
    Replase: 2,
    KeepOld: 3
}


var QueryStringHandler = function (url, duplicateValueMode) {

    var self = this;
    self.data = [];

    self.QueryStringParams = function () {
        return self.data;
    }
    self.ReturnQueryString = function (parseMethod, prefixQuestionMark) {
        if (!prefixQuestionMark) {
            prefixQuestionMark = true;
        }

        if (!parseMethod) {
            parseMethod = function (key, value) {
                return key + "=" + value;
            };
        }
        var list = [];
        for (var key in self.data) {
            list.push(parseMethod(key, self.data[key]));
        }

        return (prefixQuestionMark ? '?' : '') + list.join('&');
    };

    self.ParseQueryString = function (url, duplicateValueMode) {
        if (!duplicateValueMode) {
            duplicateValueMode = DuplicateKeyMode.Concat;
        }

        var data = {};
        url = decodeURIComponent(url);

        if (!url.indexOf("?") > -1) {
            url += "?" + url;
        }

        var urlParts = url.split("?");
        if (!urlParts[1]) {
            return data;
        }

        var queryStringParams = urlParts[1].split("&");
        for (var i = 0; i < queryStringParams.length; i++) {

            var qsParam = queryStringParams[i];
            var paramParts = qsParam.split("=");
            var key = paramParts[0];
            var value = paramParts.length == 2 ? paramParts[1] : '';
            self.InsertKey(data, key, value, duplicateValueMode);
        }
        return data;
    }

    self.InsertKey = function (data, key, value, duplicateValueMode) {
        if (data[key]) {
            self.UpdateKeyValue(data, key, value, duplicateValueMode);
        } else {
            data[key] = value;
        }
    }

    self.UpdateKeyValue = function (data, key, value, duplicateValueMode) {
        switch (duplicateValueMode) {
            case DuplicateKeyMode.Concat:
                data[key] += "," + value;
                break;
            case DuplicateKeyMode.Replase:
                data[key] = value;
                break;
            case DuplicateKeyMode.KeepOld:
                //do nothing, old value remains
                break;
            default:
                break;
        }
    }

    self.UpdateKey = function (key, value) {
        self.UpdateKeyValue(self.data, key, value, DuplicateKeyMode.Replase);
    }

    self.DeleteKey = function (key) {
        delete self.data[key]
    }
    self.DeleteKeys = function (keyList) {
        for (var i = 0; i < keyList.length; i++) {
            delete self.data[keyList[i]]
        }
    };

    self.RenameKey = function (oldKey, newKey) {
        self.data[newKey] = self.data[oldKey];
        self.DeleteKey(oldKey);
    }

    self.InsertOrConcat = function (key, value) {
        self.InsertKey(self.data, key, value, DuplicateKeyMode.Concat);
    };

    self.InsertOrConcatList = function (list) {
        for (var i = 0; i < list.length; i++) {
            self.InsertOrConcat(list[i].key, list[i].value);
        };
    };

    self.InsertOrReplase = function (key, value) {
        self.InsertKey(self.data, key, value, DuplicateKeyMode.Replase);
    };
    self.InsertOrReplaseList = function (list) {
        for (var i = 0; i < list.length; i++) {
            self.InsertOrReplase(list[i].key, list[i].value);
        };
    };

    self.InsertOrKeepOld = function (key, value) {
        self.InsertKey(self.data, key, value, DuplicateKeyMode.KeepOld);
    };
    self.InsertOrKeepOldList = function (list) {
        for (var i = 0; i < list.length; i++) {
            self.InsertOrKeepOld(list[i].key, list[i].value);
        };
    };
    self.data = self.ParseQueryString(url, duplicateValueMode);

    return self;
}