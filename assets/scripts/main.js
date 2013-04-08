(function () {
    var $rsvpLink = $('#rsvp-link');
    var $formContainer = $('#rsvpModal');
    var $form = $('form', $formContainer);

    var rsvp = {
        init: function () {
            this.bindEvents();
        },

        bindEvents: function (){
            $rsvpLink.on('click', this.showEvent.bind(this));
            $form.on('submit', this.submitEvent.bind(this));
        },

        showEvent: function (e){
            e.preventDefault();
            this.show();
        },

        submitEvent: function (e){
            e.preventDefault();
            this.submit();
        },

        submit: function () {
            this.clearMessage();
            this.buttonLoad();

            $.post($form.attr('action'), $form.serialize())
                .fail(function (res) {
                    this.buttonReset();
                    this.showErrorMessage(res.responseText);
                }.bind(this))
                .success(function () {
                    this.buttonReset();
                    setTimeout(function () {
                        //clear stack to avoid reseting disabled
                        this.buttonDisable();
                    }.bind(this), 100);
                    
                    this.showStatusMessage('Added your response. Thanks!');
                }.bind(this));
        },

        showErrorMessage: function (message) {
            this.showMessage(message, 'alert alert-error');
        },

        showStatusMessage: function (message) {
            this.showMessage(message, 'alert alert-success');
        },

        showMessage: function (message, cls) {
            $('.modal-body', $formContainer).prepend($('<div>', {
                'class': cls,
                text: message
            }));
        },

        buttonLoad: function () {
            $('button[type=submit]', $formContainer).button('loading');
            return this;
        },

        buttonReset: function () {
            $('button[type=submit]', $formContainer).button('reset');
            return this;
        },

        buttonDisable: function () {
            $('button[type=submit]', $formContainer).prop('disabled', true);
            return this;
        },

        clearMessage: function () {
            $('.alert', $formContainer).remove();
        },

        show: function () {
            $formContainer.modal();
        }
    };

    rsvp.init();
})();