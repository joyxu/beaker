
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.

;(function () {

window.Installation = Backbone.Model.extend({
    parse: function (data) {
        var dateattrs = ['rebooted', 'install_started', 'install_finished', 'postinstall_finished'];
        var model = this;
        _.each(dateattrs, function (dateattr) {
            if (data[dateattr]) {
                var parsed = moment.utc(data[dateattr]);
                data[dateattr] = parsed.isSame(model.get(dateattr)) ? model.get(dateattr) : parsed;
            }
        });
        if (!_.isEmpty(data['commands'])) {
            var commands = this.get('commands') || [];
            data['commands'] = _.map(data['commands'], function (commanddata, i) {
                var command = commands[i];
                if (command) {
                    command.set(command.parse(commanddata));
                } else {
                    command = new Command(commanddata, {parse: true});
                }
                return command;
            });
        }
        return data;
    },
});

})();
