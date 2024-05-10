local obslua = require('obslua')

local selected_source_name = nil

local function populate_source_list(property, sources)
    obslua.obs_property_list_clear(property)
    local source_list = obslua.obs_enum_sources()
    if source_list then
        for _, source in ipairs(source_list) do
            local source_name = obslua.obs_source_get_name(source)
            obslua.obs_property_list_add_string(property, source_name, source_name)
        end
    end
    obslua.source_list_release(source_list)
end



function send_hotkey_tbs1(source_name, hotkey_id_name, key_up, key_modifiers)
 local source = obslua.obs_get_source_by_name(source_name)
    if source ~= nil then
      local key = obslua.obs_key_from_name(hotkey_id_name)
      local vk = obslua.obs_key_to_virtual_key(key)
      local event = obslua.obs_key_event()
      event.native_vkey = vk
      event.native_modifiers = event.modifiers
      event.native_scancode = vk
      event.text = "" -- it possible to leave it blank, keys are sent
      obslua.obs_source_send_key_click(source,event,key_up)
      obslua.obs_source_release(source)
  else
    print("Source not found: " .. source_name)
  end
end

function hotkey_callback_prev(pressed)
    if pressed then
        if selected_source_name then
            send_hotkey_tbs1(selected_source_name, "OBS_KEY_LEFT", false)
        end
        print("Hotkey Pressed - URL Updated")
    end
end

function hotkey_callback_next(pressed)
    if pressed then
        if selected_source_name then
            send_hotkey_tbs1(selected_source_name, "OBS_KEY_RIGHT", false)
        end
        print("Hotkey Pressed - URL Updated")
    end
end
function hotkey_callback_toggle(pressed)
    if pressed then
        if selected_source_name then
            send_hotkey_tbs1(selected_source_name, "OBS_KEY_SPACE", false)
        end
        print("Hotkey Pressed - URL Updated")
    end
end

function script_load(settings)
    hotkey_id_prev = obslua.obs_hotkey_register_frontend("update_browser_url_hotkey_prev", "SDA Hymnal Prev", hotkey_callback_prev)
    hotkey_id_next = obslua.obs_hotkey_register_frontend("update_browser_url_hotkey_next", "SDA Hymnal Next", hotkey_callback_next)
    hotkey_id_toggle = obslua.obs_hotkey_register_frontend("update_browser_url_hotkey_toggle", "SDA Hymnal Toggle Show / Hide", hotkey_callback_toggle)
    local hotkey_id_prev_save_array = obslua.obs_data_get_array(settings, "update_browser_url_hotkey_prev")
    local hotkey_id_next_save_array = obslua.obs_data_get_array(settings, "update_browser_url_hotkey_next")
    local hotkey_id_toggle_save_array = obslua.obs_data_get_array(settings, "update_browser_url_hotkey_toggle")

    obslua.obs_hotkey_load(hotkey_id_prev, hotkey_id_prev_save_array)
    obslua.obs_hotkey_load(hotkey_id_next, hotkey_id_next_save_array)
    obslua.obs_hotkey_load(hotkey_id_toggle, hotkey_id_toggle_save_array)
    obslua.obs_data_array_release(hotkey_id_prev_save_array)
    obslua.obs_data_array_release(hotkey_id_next_save_array)
    obslua.obs_data_array_release(hotkey_id_toggle_save_array)
end

function script_save(settings)
    local hotkey_save_array_prev = obslua.obs_hotkey_save(hotkey_id_prev)
    local hotkey_save_array_next = obslua.obs_hotkey_save(hotkey_id_next)
    local hotkey_save_array_toggle = obslua.obs_hotkey_save(hotkey_id_toggle)

    obslua.obs_data_set_array(settings, "update_browser_url_hotkey_prev", hotkey_save_array_prev)
    obslua.obs_data_set_array(settings, "update_browser_url_hotkey_next", hotkey_save_array_next)
    obslua.obs_data_set_array(settings, "update_browser_url_hotkey_toggle", hotkey_save_array_toggle)

    obslua.obs_data_array_release(hotkey_save_array_prev)
    obslua.obs_data_array_release(hotkey_save_array_next)
    obslua.obs_data_array_release(hotkey_save_array_toggle)
end


function script_properties()
    local props = obslua.obs_properties_create()
    local p = obslua.obs_properties_add_list(props, "source_dropdown", "Select Source",
                                             obslua.OBS_COMBO_TYPE_LIST,
                                             obslua.OBS_COMBO_FORMAT_STRING)
    populate_source_list(p)
    return props
end

-- Function to update the selection
function script_update(settings)
    selected_source_name = obslua.obs_data_get_string(settings, "source_dropdown")
end

-- Script description
function script_description()
    return "Script to send Left and Right keys to the selected source. Use it with OBS SDA Hymnal browser source"
end
