ready = function() {
    console.log('Ready called.');
    cmd = new CMD({
        respond: function() {
            var addClass = function(el, className) {
                if (el.classList) {
                    el.classList.add(className);
                } else {
                    el.className += ' ' + className;
                }
                return el;
            };
            for (var i = 0; i < arguments.length; i++) {
                // document.querySelector('#responses').appendChild()
                // var rowData = addClass(document.createElement('td'), 'response');
                // var row = addClass(document.createElement('tr'), 'response');
                // row = row.appendChild(rowData);
                document.getElementById('responses').appendChild(
                    addClass(document.createElement('tr'), 'response')
                    .appendChild(addClass(document.createElement('td'), 'response'))
                );

                // $('#responses').append('<tr class="response"><td class="response">'+arguments[i]+'</td></tr>');
            }
        },
        save: function(cmdData) {
            if (typeof Storage !== "undefined") {
                for (var i in cmdData) {
                    localStorage.setItem(i, JSON.stringify(cmdData[i]));
                }
            }
        },
        load: function() {
            var storedDataNames = ['data', 'money', 'increment', 'autoIncrement', 'unlocked'];
            var loadObj = {};
            for (var i = 0; i < storedDataNames.length; i++) {
                var dataName = storedDataNames[i];
                loadObj[dataName] = JSON.parse(localStorage.getItem(dataName));
            }
            return loadObj;
        },
        update: function(cmdObj) {
            // $('#dataCount').html(cmdObj.formatBytes());
            document.getElementById('dataCount').textContent = cmdObj.formatBytes();
            // $('#moneyCount').html('$'+cmdObj.money);
            document.getElementById('moneyCount').textContent = '$'+cmdObj.money;
        }
    });

    document.addEventListener('keypress', function(e) {
        var key = e.keyCode || e.which;
        if (key === 13) {
            cmd.command(document.getElementById('input').value);
            cmd.historyBufferCurrentIdx = -1;
            var windowObj = document.getElementById('cmdWindow');
            windowObj.scrollTop = windowObj.scrollHeight;
            document.getElementById('input').value = '';
        }
    });
    // $(document).keypress(function(e) {
    //     if (e.which == 13) {
    //         cmd.command($('#input').val());
    //         cmd.historyBufferCurrentIdx = -1;
    //         $('#cmdWindow').scrollTop($('#cmdWindow')[0].scrollHeight);
    //         $('#input').val('');
    //     }
    // });

    document.getElementById('input').addEventListener('keypress', function(e) {
        var key = e.keyCode || e.which;
        if (key === 38 || key === 40) {
            cmd.respond("Arrow key functionality has not yet been implemented.");
            console.log("Arrow key functionality has not yet been implemented.");
        }
    });
    // $('#input').keyup(function(e) {
    //     if (e.which === 38 || e.which === 40) {
    //         cmd.respond("Arrow key functionality has not yet been implemented.");
    //         console.log("Arrow key functionality has not yet been implemented.");
    //     }
    // });
    console.log('Ready finished.');
};
