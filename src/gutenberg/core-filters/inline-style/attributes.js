wp.hooks.addFilter('blocks.registerBlockType', 'custom-blocks/inline-style/attributes', function (settings, name) {
    settings = window.lodash.assign({}, settings, {
        attributes: window.lodash.assign({}, settings.attributes, {
            inlineStyle: {
                type: 'string',
                default: "",
            }
        })
    });
    return settings;
});

wp.hooks.addFilter('blocks.getSaveContent.extraProps','custom-blocks/inline-style/inspector',function(props, name, atts){

    if(atts['inlineStyle']!="")
        return Object.assign(props, { style: atts['inlineStyle'] });

    return props;
});
