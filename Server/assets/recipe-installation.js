
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

;(function () {

window.RecipeInstallationView = Backbone.View.extend({
    template: JST['recipe-installation'],
    initialize: function() {
        this.render();
    },
    render: function () {
        this.$el.html(this.template( this.model.attributes));
        new LogsLink({model: this.model}).$el.appendTo(this.$('div.recipe-installation-logs'));
        var recipe_installation_details = new RecipeInstallationDetails({model: this.model});
        this.$('.recipe-installation-details').append(recipe_installation_details.el);
    },
});

var RecipeInstallationDetails = Backbone.View.extend({
    tagName: 'div',
    template: JST['recipe-installation-details'],
    events: {
        'click .toggle-progress-settings button': 'toggle_progress_settings',
    },
    toggle_progress_settings: function (evt) {
        var selected_side;
        if (!_.isEmpty(evt)) {
            evt.preventDefault();
            selected_side = $(evt.currentTarget).text() ;
        } else {
            selected_side = 'Progress';
        }
        switch (selected_side) {
            case 'Progress':
                this.$('.recipe-installation-progress').show();
                this.$('.recipe-installation-settings').hide();
                break;
            case 'Settings':
                this.$('.recipe-installation-progress').hide();
                this.$('.recipe-installation-settings').show();
                break;
        }
    },
    initialize: function (options) {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        var progress = new RecipeInstallationProgress({model: this.model}).el;
        var settings = new RecipeInstallationSettings({model: this.model}).el;
        this.$('.recipe-installation-progress-settings').empty().append(progress).append(settings);
        this.toggle_progress_settings();
        return this;
    },
});
/**
 * Gets the difference in milliseconds between two dates.
 */
window.get_time_difference = function(date_one, date_two) {
    var diff, date_format='hh:mm:ss';
    diff = moment.utc(moment(date_one)).diff(moment.utc(
        moment(date_two)));
    if (diff > 0) {
        date_format = '+' + date_format;
        return moment.duration(diff).format("+hh:mm:ss", { trim: false });
    }
    return moment.duration(diff).format(date_format, { trim: false });
};

var RecipeInstallationProgress = Backbone.View.extend({
    className: 'recipe-installation-progress',
    template: JST['recipe-installation-progress'],
    initialize: function (options) {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(_.extend(this.model.attributes, get_time_difference)));
        return this;
    },
});

var RecipeInstallationSettings = Backbone.View.extend({
    className: 'recipe-installation-settings',
    template: JST['recipe-installation-settings'],
    initialize: function (options) {
        this.render();
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
});

})();
