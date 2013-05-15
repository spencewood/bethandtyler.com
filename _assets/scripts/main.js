(function ($) {
    var $rsvpLink = $('#rsvp-link');
    var $modal = $('#rsvpModal');
    var $form = $('form', $modal);

    /**
     * RSVP module
     */
    var rsvp = {
        init: function () {
            this.bindEvents();
        },

        bindEvents: function (){
            $rsvpLink.on('click', this.showEvent.bind(this));
            $form.on('submit', this.submitEvent.bind(this));
            $modal.on('hide', this.clearForm);
            $modal.on('hide', this.clearMessage);
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

            $.ajax({
                url: $form.attr('action'),
                data: $form.serialize(),
                type: 'POST',
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                success: function () {
                    this.showStatusMessage('Added your response. Thanks!');
                }.bind(this),
                error: function (res) {
                    this.showErrorMessage(res.responseText, res.status);
                }.bind(this),
                complete: function () {
                    this.buttonReset();
                }.bind(this)
            });
        },

        showErrorMessage: function (message, status) {
            if(typeof message === 'undefined' || message.length === 0){
                message = 'Something unexpected happened! Please try again later.';
            }
            switch(status){
            case 409:
                message += ' Need to change something? Contact Tyler (tcollard@gmail.com).';
            }
            this.showMessage(message, 'alert alert-error');
        },

        showStatusMessage: function (message) {
            this.showMessage(message, 'alert alert-success');
        },

        showMessage: function (message, cls) {
            $('.modal-body', $modal).prepend($('<div>', {
                'class': cls,
                text: message
            }));
        },

        buttonLoad: function () {
            $('button[type=submit]', $modal).button('loading');
            return this;
        },

        buttonReset: function () {
            $('button[type=submit]', $modal).button('reset');
            return this;
        },

        buttonDisable: function () {
            $('button[type=submit]', $modal).prop('disabled', true);
            return this;
        },

        clearMessage: function () {
            $('.alert', $modal).remove();
        },

        clearForm: function () {
            $('input, textarea', $form).each(function () {
                switch($(this).prop('type')){
                case 'number':
                    $(this).val(0);
                    break;
                case 'checkbox':
                    $(this).prop('checked', true);
                    break;
                default:
                    $(this).val('');
                    break;
                }
            });
        },

        show: function () {
            $modal.modal();
        }
    };

    /**
     * Slideshow module
     */
    var slideshow = {
        init: function () {
            $('#slides').slidesjs({
                width: 940,
                height: 528,
                play: {
                    active: true,
                    auto: true
                }
            });
        }
    };

    rsvp.init();
    slideshow.init();
})(jQuery);