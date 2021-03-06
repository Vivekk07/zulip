import $ from "jquery";

import * as stream_color from "./stream_color";
import * as stream_data from "./stream_data";

// Add functions to this that have no non-trivial
// dependencies other than jQuery.

export function change_tab_to(tabname) {
    $(`#gear-menu a[href="${CSS.escape(tabname)}"]`).tab("show");
}

// https://stackoverflow.com/questions/4233265/contenteditable-set-caret-at-the-end-of-the-text-cross-browser
export function place_caret_at_end(el) {
    el.focus();

    if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange !== "undefined") {
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

export function blur_active_element() {
    // this blurs anything that may perhaps be actively focused on.
    document.activeElement.blur();
}

function update_lock_icon_for_stream(stream_name) {
    const icon = $("#compose-lock-icon");
    const streamfield = $("#stream_message_recipient_stream");
    if (stream_data.get_invite_only(stream_name)) {
        icon.show();
        streamfield.addClass("lock-padding");
    } else {
        icon.hide();
        streamfield.removeClass("lock-padding");
    }
}

// In an attempt to decrease mixing, set stream bar
// color look like the stream being used.
// (In particular, if there's a color associated with it,
//  have that color be reflected here too.)
export function decorate_stream_bar(stream_name, element, is_compose) {
    if (stream_name === undefined) {
        return;
    }
    const color = stream_data.get_color(stream_name);
    if (is_compose) {
        update_lock_icon_for_stream(stream_name);
    }
    element
        .css("background-color", color)
        .removeClass(stream_color.color_classes)
        .addClass(stream_color.get_color_class(color));
}
