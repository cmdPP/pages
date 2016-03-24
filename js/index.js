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
            var elResponses = document.getElementById('responses');
            for (var i = 0; i < arguments.length; i++) {
                // document.querySelector('#responses').appendChild()
                // var rowData = addClass(document.createElement('td'), 'response');
                // var row = addClass(document.createElement('tr'), 'response');
                // row = row.appendChild(rowData);
                // document.getElementById('responses').appendChild(
                //     addClass(document.createElement('tr'), 'response')
                //     .appendChild(addClass(document.createElement('td'), 'response'))
                // );

                var row = addClass(document.createElement('tr'), 'response');
                console.log('Row before data:', row);
                row.innerHTML = '<td class="response">'+arguments[i]+'</td>';
                console.log('With data:', row);
                elResponses.appendChild(row);

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

    document.body.addEventListener('keypress', function(e) {
        // console.log('Key pressed:', e);
        var key = e.keyCode || e.which;
        if (key === 13) {
            // console.log('Key was enter.');
            // console.log('Enter pressed.');
            var inputObj = document.getElementById('input');
            // console.log('Input val:', inputObj.value);
            cmd.command(inputObj.value);
            cmd.historyBufferCurrentIdx = -1;
            var windowObj = document.getElementById('cmdWindow');
            windowObj.scrollTop = windowObj.scrollHeight;
            inputObj.value = '';
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

    // document.getElementById('input').addEventListener('keypress', function(e) {
    //     var key = e.keyCode || e.which;
    //     console.log('Input keypress:', e);
    //     if (key === 38 || key === 40) {
    //         cmd.respond("Arrow key functionality has not yet been implemented.");
    //         console.log("Arrow key functionality has not yet been implemented.");
    //     }
    // });
    document.getElementById('input').onkeydown = function(e) {
        var key = e.keyCode || e.which;
        // console.log('Input keypress:', key);
        if (key === 38 || key === 40) {
            cmd.respond("Arrow key functionality has not yet been implemented.");
            console.log("Arrow key functionality has not yet been implemented.");
        }
    };
    // $('#input').keyup(function(e) {
    //     if (e.which === 38 || e.which === 40) {
    //         cmd.respond("Arrow key functionality has not yet been implemented.");
    //         console.log("Arrow key functionality has not yet been implemented.");
    //     }
    // });
    console.log('Ready finished.');
};
