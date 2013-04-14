module Jekyll
    class GuestFormTag < Liquid::Tag
        def initialize(tag_name, text, tokens)
            super
        end

        def render(context)
            ENV['RACK_ENV'] == 'production' ?
                context.registers[:site].config['prod_guest_form_url'] :
                context.registers[:site].config['dev_guest_form_url']
        end
    end
end

Liquid::Template.register_tag('guest_form_url', Jekyll::GuestFormTag)