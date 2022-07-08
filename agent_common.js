//============================================================
// Helper functions used to set the action of some pages
//============================================================
function parseQueryParams(queryString)
{
    var params = {}, tmp;
    var queries = queryString.split('&');

    var i;
    for (i = 0; i < queries.length; i++) {
        tmp = queries[i].split('=');
        params[tmp[0]] = tmp[1];
    }
    return params;
}

function setFormAttributeByQueryParams(formName, attributeName, urlPathPrefix)
{
    var params = parseQueryParams(window.location.search.substr(1));
    if (!params.hasOwnProperty('state')) {
        return;
    }

    var form = document.getElementById( formName );
    if (form == null) {
        return;
    }

    var attributeValue = urlPathPrefix + "?state=" + params['state'];
    form.setAttribute(attributeName, attributeValue);
    return;
}

