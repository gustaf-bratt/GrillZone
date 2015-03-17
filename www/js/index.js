var etmRestaurant = {
    url: 'http://www.grillzone.co.uk/index.php?route=module/mobileapp/',
    pincode: "",
    username: "",
    password: "",
    first_dwnd_cound: 1,
    pbar: '',
    pbar_count: 0,
    pbar_total_count: 10,
    product_id: '',
    per_count: 0,
    deal_opt_count: 0,
    item_count: 0,
    cart: [],
    temp_cart: [],
    delete_keys_arr: [],
    added_count: 0,
    per_item_count: 0,
    added_items: [],
    products_IDs: [],
    category_products: [],
    selected_product: [],
    localstoragesize: 0,
    deal_selected_count: 0,
    req_radio_count: 0,
    localloding_complete: true,
    localloding_IntervalID: null,
    menuthemelevel: 0,
    temp_itemcount: 0,
    ref: '',
    payment_success: 0,
    error_continue_page: ''
};
$(document).on("pageshow", '#pageLoading', localLoading);
$(document).on("click", '#btn_register', register);
$(document).on("click", '#btn_usrname_login', login);
$(document).on("click", '.btn_checkout', checkout);
$(document).on("pagebeforecreate", '#pageHome', displayCategories);
$(document).on("click", '#btn_coupon', checkcoupon);
$(document).on("click", '#btn_skip', shipdetails);
$(document).on("click", '#btn_next', shipdetails);
$(document).on("click", '#btn_review', revieworder);
$(document).on("click", '#btn_confirm', confirmorder);
$(document).on("click", '.btn_settings', settings);
$(document).on("pagebeforeshow", '#pageEdit', editAccount);
$(document).on("click", '#submit_edit_acc', changecustomerdetails);
$(document).on("click", '#submit_add_address', addAddress);
$(document).on("click", '#submit_edit_pswd', changePassword);
$(document).on("pagebeforeshow", '#pageRewards', orderHistory);
$(document).on("pagebeforeshow", '#pageHistory', orderHistory);
$(document).on("pageshow", '#pageHistory', refreshorderHistory);
$(document).on("pageshow", '#pageRewards', refreshorderHistory);
$(document).on("click", '.btn_orderstatus', orderstats);
$(document).on("click", '.btn_view', getorder);
$(document).on("pagebeforeshow", '#pageAddress', addressList);
$(document).on("pagebeforeshow", '#dialogPageAddress', dialogAddressList);
$(document).on("click", '.btn_reorder', reorder);
$(document).on("click", '.btn_edit_address', addressToEdit);
$(document).on("click", '#submit_edit_address', changeaddress);
$(document).on("click", '#btn_logout', logout);
$(document).on("click", '.btn_smartdeal_yes', cartdetails);
$(document).on("click", '.delete_item', confirmation);
$(document).on("click", '.delete_ok', delete_ok);
$(document).on("click", '.delete_item_ok', cartdetails);
$(document).on("click", '.plus_quantity', cartdetails);
$(document).on("click", '.minus_quantity', cartdetails);
$(document).on("click", '.btn_info', getstoreinfo_fromlocal);
$(document).on("click", '.delivery_address', change_ship_address);
$(document).on("change", '#select_delivery_time', time_change);
$(document).on("click", '#btn_ship_addaddress', shipAddAddress);
$(document).on("click", '#btn_confirm_remove', removeAccount);
$(document).on('click', '.product-cell', product_add);
$(document).on('click', '.product-description', product_description);
$(document).on('click', '#orderstatus', getorder);
$(document).on("click", ".btn_menu", menu);
$(document).on("click", '#btn_email_send', forgottenPassword);
$(document).on("pagebeforeshow", '#pageUserRegister', beforePageRegister);
$(document).on("pagebeforeshow", '#pageEdit', beforePageEdit);
$(document).on("pagebeforeshow", '#pageAddAddress', beforePageAddAddress);
$(document).on("pagebeforeshow", '#pageEditAddress', beforePageEditAddress);
$(document).on("pagebeforeshow", '#pageHome', beforePageHome);
$(document).on("pageshow", '#pageHome', showPageHome);
$(document).on("pagebeforeshow", '#pageProducts', beforePageProducts);
$(document).on("pagebeforeshow", '#pageLogin', beforePageLogin);
$(document).on("pagebeforeshow", '#pageChangePassword', beforePageChangePassword);
$(document).on("click", '#btn_back_chkout', click_btn_back_chkout);
$(document).on("pageshow", '#pageflashScreen', showPageflashScreen);
$(document).on("click", '.offerslist', click_offerslist);
$(document).on("blur", '#txt_postcode', blur_txt_postcode);
$(document).on("blur", '#newpostcode', blur_newpostcode);
$(document).on("blur", '#editpostcode', blur_editpostcode);
$(document).on('click', '.category-cell', click_category_cell);
$(document).on("change", ".bundled-single-product", change_bundle_product);
$(document).on("click", '.delete_bubble', click_delete_bubble);
$(document).on("click", '#btn_addtocart', click_btn_addtocart);
$(document).on("click", '.btn_bundle_addtocart', click_btn_bundle_addtocart);
$(document).on("change", 'select', change_select);
$(document).on("click", '.btn_dealskip', click_btn_dealskip);
$(document).on("click", '.btn_offers', click_btn_offers);
$(document).on("click", '#btn_history', click_btn_history);
$(document).on("click", '#btn_reward', click_btn_reward);
$(document).on("click", '#btn_edit', click_btn_edit);
$(document).on("click", '#btn_change_password', click_btn_change_password);
$(document).on("click", '#btn_edit_address', click_btn_edit_address);
$(document).bind('mobileinit', function() {
    $.mobile.autoInitializePage = false;
});
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        document.addEventListener("backbutton", onBackKeyDown, false);
        etmRestaurant.db = window.sqlitePlugin.openDatabase({name: "etmRestaurantDB.db"});
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        MobileStart();
    }
};
function onBackKeyDown(e) {
    if ($.mobile.activePage.is('#pageHome')) {
        e.preventDefault();
        navigator.notification.confirm("Are you sure you want to exit ?", onConfirm, "Confirmation", "Yes,No");
    }
    else if ($.mobile.activePage.is('#pageConfirm') || $.mobile.activePage.is('#pageLogin') || $.mobile.activePage.is('#pageCart') || $.mobile.activePage.is('#pageOffers') || $.mobile.activePage.is('#pageProducts')) {
        e.preventDefault();
        $.mobile.changePage('#pageHome');
    }
    else if ($.mobile.activePage.is('#pageShipping')) {
        e.preventDefault();
        $.mobile.changePage('#pageCart');
    }
    else if ($.mobile.activePage.is('#pageLoading')) {
        e.preventDefault();
    }
    else {
        navigator.app.backHistory();
    }
}
function onConfirm(button) {
    if (button == 2) {
        return;
    } else {
        navigator.app.exitApp();
    }
}
$(function() {
    $('#popup-outside-page').enhanceWithin().popup();
});
function MobileStart() {
    $.mobile.initializePage();
    $.mobile.loader.prototype.options.text = "Loading...";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.textonly = false;
    $.mobile.loader.prototype.options.html = "";
    $('.ui-icon-loading').hide();
    $(".navbar_second").hide();
    $('[data-role="footer"]').append('<div class="copy copy_right"><small>Powered By eTakeaway Max</small></div>');
}
function isOnlineConnection() {
    var nets = "";
    nets = navigator.connection.type;
    if (nets == 'none' || nets == 'unknown') {
        return false;
    }
    else {
        return true;
    }
}
function show_loading_icon() {
    $.mobile.loading('show', {
        text: $.mobile.loader.prototype.options.text,
        textVisible: $.mobile.loader.prototype.options.textVisible,
        theme: $.mobile.loader.prototype.options.theme,
        textonly: $.mobile.loader.prototype.options.textonly,
        html: $.mobile.loader.prototype.options.html
    });
}
$(document).on("click", '.btn_payment_error', function() {
    cartdetails();
});
$(document).on("click", '#btn_addaddress', function() {
    if (sessionStorage.from_ship_page) {
        sessionStorage.removeItem("from_ship_page");
    }
    $.mobile.changePage('#pageAddAddress');
});
$(document).on("click", '#btn_error_continue', function() {
    continue_page = etmRestaurant.error_continue_page;
    if (typeof continue_page == 'function') {
        continue_page();
    }
    else {
        $.mobile.changePage(continue_page);
    }
});
$(document).on('pagehide', '#dialogPageAddress', function() {
    if (sessionStorage.null_shipping_method) {
        if (sessionStorage.from_ship_page) {
            $.mobile.changePage('#pageAddAddress');
        }
        else {
            cartdetails();
        }
    }
});
function getLastModified() {
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getLastModified',
                {}, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                json = JSON.parse(response.data);
                localStorage.setItem("prodUpdatedTime", new Date());
                if (json['last_modified'] != localStorage.last_modified) {
                    $.mobile.changePage("#pageLoading");
                }
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageHome';
                catch_errors(e, "Error - 101");

            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error - C 101");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageHome';
        connection_errors("Error - C1 101");
    }
}
function checkLocalStorage() {
    $(".orderstat").html('');
    if (!(localStorage.cat_last_modified)) {
        $.mobile.changePage("#pageLoading");
    }
    else if (!(localStorage.customer_id)) {
        $.mobile.changePage("#pageHome");
    }
    else {
        sessionStorage.setItem("from_loginpage", "yes");
        orderStatus();
        cartdetails();
    }
}
function catch_errors(e, err) {
    console.log(e);
    $('#cosole_errors').html(err);
    $.mobile.loading('hide');
    $.mobile.changePage('#pageError');
}
function connection_errors(err) {
    $('#cosole_errors').html(err);
    $.mobile.loading('hide');
    $.mobile.changePage('#pageError');
}
function menu() {
    $.mobile.changePage('#pageHome');
}
function login() {
    $(".orderstat").html('');
    $('#login_error').html('');
    if ($('#txt_username').val() == "" || $('#pwd_password').val() == "") {
        $('#login_error').html('<span class="error" >Enter Email and Password</span>');
        return 0;
    }
    data = {email: $('#txt_username').val(), password: $('#pwd_password').val()};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'login',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                cust = JSON.parse(response.data);
                if (cust['success']) {
                    if (localStorage.customer_id) {
                        if (localStorage.customer_id != cust.success.customer_id) {
                            localStorage.removeItem('customer_id');
                            localStorage.removeItem('address_id');
                            localStorage.setItem('customer_id', cust.success.customer_id);
                            localStorage.setItem('address_id', cust.success.address_id);
                            localStorage.setItem('customer', response.data);
                            $('.btn_checkout').html('');
                        }
                        myAccount();
                        sessionStorage.setItem("from_loginpage", "yes");
                        orderStatus();
                        cartdetails();
                    }
                    else {
                        localStorage.setItem('customer_id', cust.success.customer_id);
                        localStorage.setItem('address_id', cust.success.address_id);
                        localStorage.setItem('customer', response.data);
                        myAccount();
                        sessionStorage.setItem("from_loginpage", "yes");
                        orderStatus();
                        cartdetails();
                    }
                }
                if (cust['error']) {
                    $('#login_error').html('<span class="error" >' + cust['error'] + '</span>');
                    return 0;
                }
            }
            catch (e) {
                etmRestaurant.error_continue_page = login;
                catch_errors(e, "Error - 102");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = login;
                    connection_errors("Error -  C 102");
                });
    }
    else {
        etmRestaurant.error_continue_page = login;
        connection_errors("Error -  C1 102");
    }
}
function register() {
    register_error = 0;
    $('label').removeClass('error');
    $('#reg_address_error').html('');
    $('#reg_pswd_mismatch').html('');
    $('#reg_invalid_phone').html('');
    $('#reg_invalid_email').html('');
    $(".orderstat").html('');
    if ($('#txt_fname').val() == "") {
        $('[for=txt_fname]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_lname').val() == "") {
        $('[for=txt_lname]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_email').val() == "") {
        $('[for=txt_email]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_password').val() == "") {
        $('[for=txt_password]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_conf_password').val() == "") {
        $('[for=txt_conf_password]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_address').val() == "") {
        $('[for=txt_address]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_phone').val() == "") {
        $('[for=txt_phone]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_postcode').val() == "") {
        $('[for=txt_postcode]').addClass('error');
        register_error = 1;
    }
    if ($('#txt_postcode').val() != "") {
        postcode = $('#txt_postcode').val();
        pcode = postcode_formater(postcode);
        validpcode = postcode_check(pcode);
        if (validpcode == false) {
            $('#reg_address_error').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Post Code</span>');
            register_error = 1;
        }
    }
    if ($('#txt_password').val() != $('#txt_conf_password').val()) {
        $('#reg_pswd_mismatch').html('<span class="error" >&nbsp;&nbsp;&nbsp;Password Mismatch</span>');
        register_error = 1;
    }
    if ($('#txt_email').val() != "") {
        atpos = $('#txt_email').val().indexOf("@");
        dotpos = $('#txt_email').val().lastIndexOf(".");
        if (atpos < 1 || dotpos - atpos < 2) {
            $('#reg_invalid_email').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Email Address</span>');
            register_error = 1;
        }
    }
    if ($('#txt_phone').val() != "" && $('#txt_phone').val().length < 9) {
        $('#reg_invalid_phone').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Phone Number</span>');
        register_error = 1;
    }
    if ($('#txt_phone').val() != "" && (checkUKTelephone($('#txt_phone').val()) == false)) {
        $('#reg_invalid_phone').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Phone Number</span>');
        register_error = 1;
    }
    if (register_error == 1) {
        return 0;
    }
    else {
        data = {store_id: 0, firstname: $('#txt_fname').val(), lastname: $('#txt_lname').val(), email: $('#txt_email').val(), password: $('#txt_password').val(), address: $('#txt_address').val(), telephone: $('#txt_phone').val(), postcode: $('#txt_postcode').val()};
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'register',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    cust = JSON.parse(response.data);
                    if (cust['success']) {
                        localStorage.setItem('customer_id', cust.success.customer_id);
                        localStorage.setItem('address_id', cust.success.address_id);
                        localStorage.setItem('customer', response.data);
                        $('.reg_msg').html('<span class="success_msg" >Registered Successfully</span>');
                        myAccount();
                        sessionStorage.setItem("from_loginpage", "");
                        $.mobile.changePage('#pageHome');
                    }
                    if (cust['error']) {
                        $('.reg_msg').html('<span class="error" >' + cust['error'] + '</span>');
                        return 0;
                    }
                }
                catch (e) {
                    etmRestaurant.error_continue_page = register;
                    catch_errors(e, "Error - 103");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = register;
                        connection_errors("Error -  C 103");
                    });
        }
        else {
            etmRestaurant.error_continue_page = register;
            connection_errors("Error -  C1 103");
        }
    }
}
function blur_txt_postcode() {
    postcode = $('#txt_postcode').val();
    pcode = postcode_formater(postcode);
    $('#txt_postcode').val(pcode);
    validpcode = postcode_check(pcode);
    if (validpcode == false) {
        $('#reg_address_error').html('<span class="error" >Invalid Post Code</span>');
    }
}
function blur_newpostcode() {
    postcode = $('#newpostcode').val();
    pcode = postcode_formater(postcode);
    $('#newpostcode').val(pcode);
    validpcode = postcode_check(pcode);
}
function blur_editpostcode() {
    postcode = $('#editpostcode').val();
    pcode = postcode_formater(postcode);
    $('#editpostcode').val(pcode);
    validpcode = postcode_check(pcode);
}
function postcode_formater(postcode) {
    postcode = postcode.replace(/ /g, "");
    var l = postcode.slice(-3);
    var f = postcode.slice(0, (postcode.length - 3));
    postcode = f + ' ' + l;
    postcode = postcode.toUpperCase();
    return postcode;
}
function postcode_check(postcode) {
    var regPostcode = /[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}/i;
    if (regPostcode.test(postcode) == false) {
        return false;
    }
    else {
        return true;
    }
}
function beforePageRegister() {
    $('label').removeClass('error');
    $('#reg_address_error').html('');
    $('#reg_pswd_mismatch').html('');
    $('#reg_invalid_phone').html('');
    $('#reg_invalid_email').html('');
    $(".orderstat").html('');
    $('#reg_form input').val('');
    $('#reg_form textarea').val('');
    $('.reg_msg').html('');
}
function beforePageEdit() {
    $('label').removeClass('error');
    $('#edit_msg').html('');
    $('#edit_invalid_email').html('');
    $('#edit_invalid_phone').html('');
}
function beforePageAddAddress() {
    $('label').removeClass('error');
    $('#addaddr_invalid_post').html('');
    $('#addaddr_invalid_phone').html('');
    $('#edit_details input').val('');
    $('#edit_details textarea').val('');
}
function beforePageEditAddress() {
    $('label').removeClass('error');
    $('#addr_invalid_post').html('');
}
function beforePageHome() {
    if (localStorage.prodUpdatedTime) {
        date_diff = Date.parse(new Date()) - Date.parse(localStorage.prodUpdatedTime);
        if (date_diff >= 86400000) {
            if (isOnlineConnection()) {
                getLastModified();
            }
        }
    }
    $('#c1').listview('refresh');
}
function showPageHome() {
    if (!sessionStorage.offer_checked) {
        if (isOnlineConnection()) {
            getOffers(function(offersexist) {
                if (offersexist != "") {
                    $.mobile.changePage("#pageOffers");
                }
            });
        }
        else {
            $(".navbar_second").hide();
            $(".navbar_one").show();
        }
    }
}
function beforePageProducts() {
    $('#p1').listview('refresh');
}
function beforePageLogin() {
    if (sessionStorage.sent_newpassord) {
        $('#login_error').html('<span class="success_msg">' + sessionStorage.sent_newpassord + '</span>');
        sessionStorage.removeItem("sent_newpassord");
    }
    else {
        $('#login_error').html('');
    }
}
function beforePageChangePassword() {
    $('#pswd_edit_details').trigger('create');
}
function click_btn_back_chkout() {
    $.mobile.changePage('#pageCart');
}
function showPageflashScreen() {
    window.setTimeout(function() {
        checkLocalStorage();
    }, 2000);
}
function click_offerslist() {
    $.mobile.changePage("#pageHome");
}
function errorCB1(err) {
    console.log(" Erroressing SQL: " + err.code);
}
function localLoading() {
    etmRestaurant.localloding_complete = false;
    etmRestaurant.localloding_IntervalID = setInterval(function() {
        if (etmRestaurant.localloding_complete) {
            clearInterval(etmRestaurant.localloding_IntervalID);
            getstoreinfo();
        }
    }, 1000);
    pbar = jQMProgressBar('progressbar')
            .setOuterTheme('b')
            .setInnerTheme('c')
            .isMini(true)
            .setStartFrom(0)
            .setInterval(100)
            .showCounter(true)
            .build();
    etmRestaurant.db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS localDB');
        tx.executeSql('CREATE TABLE IF NOT EXISTS localDB (localkey TEXT PRIMARY KEY,localvalue TEXT)');
        tx.executeSql('DROP TABLE IF EXISTS productsDB');
        tx.executeSql('CREATE TABLE IF NOT EXISTS productsDB (product_id INTEGER PRIMARY KEY,product TEXT)');
        tx.executeSql('DROP TABLE IF EXISTS menutoproductsDB');
        tx.executeSql('CREATE TABLE IF NOT EXISTS menutoproductsDB (category_id INTEGER ,product_id INTEGER)');
    }, errorCB1, function() {
        getMenus();
    });
}
function getMenus() {
    data = {};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getMenus',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                json = JSON.parse(response.data);
                localStorage.setItem('cat_last_modified', json['cat_last_modified']);
                etmRestaurant.db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO localDB(localkey,localvalue) VALUES (?,?)', ['menus', response.data]);
                    cats = cat_subs(json['menus']);
                    for (i in cats) {
                        category = cats[i];
                        for (k in category['products']) {
                            product_id = category['products'][k];
                            tx.executeSql('INSERT INTO menutoproductsDB (category_id ,product_id) VALUES (?,?)', [category['category_id'], product_id]);
                        }
                    }
                }, errorCB1, function() {
                    etmRestaurant.localstoragesize += 1;
                    getProducts();
                });
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageLoading';
                clearInterval(etmRestaurant.localloding_IntervalID);
                catch_errors(e, "Error - 104");
            }
            etmRestaurant.pbar_count++;
            pbar.setValue(parseInt(etmRestaurant.pbar_count / etmRestaurant.pbar_total_count * 100));
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageLoading';
                    clearInterval(etmRestaurant.localloding_IntervalID);
                    connection_errors("Error -  C 104");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageLoading';
        clearInterval(etmRestaurant.localloding_IntervalID);
        connection_errors("Error -  C1 104");
    }
}
function cat_subs(menus) {
    cats = [];
    for (i in menus) {
        category = menus[i];
        cats.push({category_id: category['category_id'], products: category['products']});
        if (category['categories'] && category['categories'].length > 0) {
            cats = cats.concat(cat_subs(category['categories']));
        }
    }
    return cats;
}
function getProducts() {
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getproductsIDs',
                {}, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                ProductIDS = JSON.parse(response.data);
                localStorage.setItem("prodUpdatedTime", new Date());
                localStorage.setItem("last_modified", ProductIDS['last_modified']);
                etmRestaurant.localstoragesize += (response.data.length * 2);
                etmRestaurant.products_IDs = ProductIDS['proIDS'];
                etmRestaurant.per_count = etmRestaurant.per_count + ProductIDS['proIDS'].length;
                etmRestaurant.pbar_total_count += ProductIDS['proIDS'].length;
                pbar.setValue(parseInt(etmRestaurant.pbar_count / etmRestaurant.pbar_total_count * 100));
                products_lS_recursive();
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageLoading';
                clearInterval(etmRestaurant.localloding_IntervalID);
                catch_errors(e, "Error - 105");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageLoading';
                    clearInterval(etmRestaurant.localloding_IntervalID);
                    connection_errors("Error -  C 105");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageLoading';
        clearInterval(etmRestaurant.localloding_IntervalID);
        connection_errors("Error -  C1 105");
    }
}
function products_lS_recursive() {
    if (etmRestaurant.products_IDs && etmRestaurant.products_IDs.length > 0 && typeof etmRestaurant.products_IDs != 'undefined') {
        product_id = etmRestaurant.products_IDs.shift();
        if (product_id && product_id['product_id'] != 'undefined') {
            product_id = product_id['product_id'];
            data = {product_id: product_id};
            if (isOnlineConnection()) {
                window.cordovaHTTP.post(etmRestaurant.url + 'getProduct',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        json = JSON.parse(response.data);
                        etmRestaurant.db.transaction(function(tx) {
                            tx.executeSql('INSERT INTO productsDB(product_id,product) VALUES (?,?)', [json['product_id'], response.data]);
                        }, errorCB1, function() {
                            etmRestaurant.localstoragesize += (response.data.length * 2);
                            etmRestaurant.pbar_count++;
                            pbar.setValue(parseInt(etmRestaurant.pbar_count / etmRestaurant.pbar_total_count * 100));
                            if (etmRestaurant.products_IDs.length != 0) {
                                products_lS_recursive();
                            }
                            else {
                                etmRestaurant.localloding_complete = true;
                            }
                        });
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = '#pageLoading';
                        clearInterval(etmRestaurant.localloding_IntervalID);
                        catch_errors(e, "106");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = '#pageLoading';
                            clearInterval(etmRestaurant.localloding_IntervalID);
                            connection_errors("Error -  C 106");
                        });
            }
            else {
                etmRestaurant.error_continue_page = '#pageLoading';
                clearInterval(etmRestaurant.localloding_IntervalID);
                connection_errors("Error -  C1 106");
            }
        }
    }
}
function getProduct(product_id, callback) {
    if (typeof (etmRestaurant.selected_product['product_id']) !== "undefined" && etmRestaurant.selected_product['product_id'] == product_id) {
        callback(etmRestaurant.selected_product);
        return;
    }
    etmRestaurant.db.transaction(function(tx) {
        tx.executeSql("SELECT product FROM productsDB WHERE product_id=" + product_id + ";", [], function(tx, results) {
            etmRestaurant.selected_product = JSON.parse(results.rows.item(0).product);
            callback(etmRestaurant.selected_product);
        }, function() {
            data = {'product_id': product_id};
            if (isOnlineConnection()) {
                window.cordovaHTTP.post(etmRestaurant.url + 'getProduct',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        etmRestaurant.selected_product = JSON.parse(response.data);
                        callback(etmRestaurant.selected_product);
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = '#pageHome';
                        catch_errors(e, "Error - 107");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = '#pageHome';
                            connection_errors("Error -  C 107");
                        });
            }
            else {
                etmRestaurant.error_continue_page = '#pageHome';

                connection_errors("Error -  C1 107");
            }
        });
    });
}
function displayCategories() {
    etmRestaurant.menuthemelevel = 1;
    if (etmRestaurant.localloding_IntervalID) {
        clearInterval(etmRestaurant.localloding_IntervalID);
    }
    try {
        etmRestaurant.db.transaction(function(tx) {
            tx.executeSql("SELECT localkey,localvalue FROM localDB WHERE localkey='menus';", [], function(tx, results) {
                menus = JSON.parse(results.rows.item(0).localvalue);
                html = menus_html(menus['menus']);
                $('#c1').html(html);
                $('#c1').trigger('create');
                $('#c1').listview('refresh');
            }, function() {
                if (isOnlineConnection()) {
                    data = {};
                    window.cordovaHTTP.post(etmRestaurant.url + 'getMenus',
                            data, {Authorization: "OAuth2: token"},
                    function(response) {
                        try {
                            menus = JSON.parse(response.data);
                            html = menus_html(menus['menus']);
                            $('#c1').html(html);
                            $('#c1').listview().trigger('create');
                            $('#c1').listview('refresh');
                        }
                        catch (e) {
                            etmRestaurant.error_continue_page = '#pageHome';
                            catch_errors(e, "Error - 108");
                        }
                    },
                            function(error) {
                                etmRestaurant.error_continue_page = '#pageHome';
                                connection_errors("Error -  C 108");
                            });
                }
                else {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error -  C1 108");
                }
            });
        });
    }
    catch (e) {
        etmRestaurant.error_continue_page = '#pageHome';
        catch_errors(e, " Error - 108A");
    }
}
function menus_html(categories) {
    if (categories) {
        html = '';
        var menuthemelevel = etmRestaurant.menuthemelevel++;
        switch (menuthemelevel % 3) {
            case 1:
                datatheme = 'b';
                break;
            case 2:
                datatheme = 'a';
                break;
            case 0:
                datatheme = 'b';
                break;
        }
        for (i in categories) {
            category = categories[i];
            etmRestaurant.category_products[category['category_id']] = category['products'];
            if (category['categories']) {
                html += '<li data-role="collapsible" data-iconpos="right"  id="c1_' + category['category_id'] + '" >';
                html += '<h3>';

                if (category['image']) {
                    html += '  <img src="' + category['image'] + '" title="' + category['name'] + '" alt="' + category['name'] + '" class="collapsible_img"/>';
                }
                html += '<span class="catname">' + category['name'] + '</span></h3>';
                if (category['categories']) {
                    html += '<ul data-role="listview" data-inset="false" data-theme="' + datatheme + '">' + menus_html(category['categories']) + '</ul>';
                }
                html += '</li>';
            }
            else {
                html += '<li  class="category-cell" id="c1_' + category['category_id'] + '" catgry_name="' + category['name'] + '">';
                html += '<a href="#">';
                if (category['image']) {
                    html += '  <img src="' + category['image'] + '" title="' + category['name'] + '" alt="' + category['name'] + '"  />';
                }
                html += '<h3>' + category['name'] + '</h3>';
                html += '</a>';
                html += '  <input type="hidden" name="category_id" value="' + category['category_id'] + '" />';
                html += '</li>';
            }
        }
        etmRestaurant.menuthemelevel = menuthemelevel;
        return html;
    }
}
function click_category_cell() {
    $('#c1 li').removeClass('cat_selected');
    $(this).addClass('cat_selected');
    $('.prod_name_head').html($(this).attr('catgry_name'));
    $('#p1').html('');
    data = '#' + $(this).attr('id') + ' input[type=\'hidden\'] ';
    products_load($(data).val());
}
function products_load(cat_id) {
    try {
        etmRestaurant.db.transaction(function(tx) {
            tx.executeSql("SELECT product  FROM productsDB JOIN menutoproductsDB ON (menutoproductsDB.product_id = productsDB.product_id ) WHERE menutoproductsDB.category_id =" + cat_id + ";", [], function(tx, results) {
                products = [];
                for (var i = 0; i < results.rows.length; i++) {
                    products[i] = JSON.parse(results.rows.item(i).product);
                }
                products_html(products);
            }, function() {
                if (isOnlineConnection()) {
                    data = {'category_id': cat_id};
                    window.cordovaHTTP.post(etmRestaurant.url + 'getProducts',
                            data, {Authorization: "OAuth2: token"},
                    function(response) {
                        try {
                            products_html(JSON.parse(response.data));
                        }
                        catch (e) {
                            etmRestaurant.error_continue_page = '#pageHome';
                            catch_errors(e, "Error - 109");
                        }
                    },
                            function(error) {
                                etmRestaurant.error_continue_page = '#pageHome';
                                connection_errors("Error -  C 109");
                            });
                }
                else {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error -  C1 109");
                }
            })
        });
    }
    catch (e) {
        etmRestaurant.error_continue_page = '#pageHome';
        catch_errors(e, "Error - 109A");
    }
}
function products_html(json) {
    var product_row = 0;
    html = '';
    if (json == '') {
        noitemhtml = '<li class="prodt-non-item"></li>';
        $('#p1').html(noitemhtml);
        return 0;
    }
    for (i in json) {
        product = json[i];
        html += '<li class="product-cell2 ' + product_row + '" id="c1_0' + product['product_id'] + '" prd_name="' + product['name'] + '" data-theme="d">';
        html += '<a href="#" data-rel="popup" data-position-to="window" data-transition="pop" class="product-description" pr_id="' + product['product_id'] + '" >';
        html += '<div>';
        if (product['image']) {
            html += '<div class="prod_image">';
            html += '  <img src="' + product['image'] + '" title="' + product['name'] + '" alt="' + product['name'] + '" / >';
            html += '</div>';
        }
        html += '<div class="p_name">' + product['name'] + '</div>';
        html += '<div class="p_price">' + (product['price'] ? product['price'] : '') + '</div></div>';
        html += '  <input type="hidden" name="product_id" value="' + product['product_id'] + '" />';
        if (product['option'] != '') {
            html += '  <input type="hidden" name="option" value="1" />';
        }
        else {
            html += '  <input type="hidden" name="option" value="0" />';
        }
        if (product['special_deal'] == 1) {
            html += '  <input type="hidden" name="bundle" value="1" />';
        }
        else {
            html += '  <input type="hidden" name="bundle" value="0" />';
        }
        html += '</div></a><a href="#"  data-icon="plus" class="product-cell" id="c1_0' + product['product_id'] + '" prd_name="' + product['name'] + '" >choose option</a>';
        html += '<div>';
        if (etmRestaurant.added_items[product['product_id']] != null && etmRestaurant.added_items[product['product_id']].quantity > 0) {
            html += '<span class="delete_bubbl' + product['product_id'] + '"><span class="delete_bubble"  delete_item_key="' + etmRestaurant.added_items[product['product_id']].key + '" prod_key="' + product['product_id'] + '" data-rel="popup">x</span></span>';
            sessionStorage.setItem('delete_keys_' + product['product_id'], etmRestaurant.added_items[product['product_id']].key);
        }
        else if (etmRestaurant.added_items[product['product_id']]) {
            html += '<span class="delete_bubbl' + product['product_id'] + '"><span class="delete_bubble" prod_key="' + product['product_id'] + '">x</span></span>';
        }
        else {
            html += '<span class="delete_bubbl' + product['product_id'] + '"></span>';
        }
        html += '</div>';
        html += '<div class="item_cnt">';
        if (etmRestaurant.added_items[product['product_id']] != null && etmRestaurant.added_items[product['product_id']].quantity > 0) {
            html += '<div class="count_item_' + product['product_id'] + ' count_btn"><span class=" cnt_item ">' + etmRestaurant.added_items[product['product_id']].quantity + '</span></div>';
        }
        else if (etmRestaurant.added_items[product['product_id']]) {
            html += '<div class="count_item_' + product['product_id'] + ' count_btn"><span class=" cnt_item ">' + etmRestaurant.added_items[product['product_id']] + '</span></div>';
        }
        else {
            html += '<div class="count_item_' + product['product_id'] + ' count_btn"></div>';
        }
        html += '</div>';
        html += '</li>';
        product_row += 1;
        $('#p1').append(html);
    }
    $('#p1').html(html);
    $.mobile.changePage("#pageProducts");
}
function product_description() {
    getProduct($(this).attr('pr_id'), products_descr_html);
}
function product_add() {
    sessionStorage.setItem("prd_name", $(this).attr('prd_name'));
    etmRestaurant.deal_selected_count = 0;
    $("#products_option").html('');
    $("#bundled_items").html('');
    $("#bundled_options").html('');
    data = '#' + $(this).attr('id') + ' input[name=\'product_id\'] ';
    $('#formprodutOption input[name=\'product_id\']').attr('value', $(data).val());
    $('#formprodutBundleOption input[name=\'product_id\']').attr('value', $(data).val());
    if ($('#' + $(this).attr('id') + ' input[name=\'option\'] ').val() == 0 && $('#' + $(this).attr('id') + ' input[name=\'bundle\'] ').val() == 0) {
        etmRestaurant.item_count++;
        etmRestaurant.cart[etmRestaurant.item_count] = $('#formprodutOption').serialize();
        product_id = $('#formprodutOption input[name=\'product_id\']').val();
        if (etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) {
            etmRestaurant.added_items[product_id].quantity += 1;
        }
        else if (etmRestaurant.added_items[product_id]) {
            etmRestaurant.added_items[product_id] += 1;
        }
        else {
            etmRestaurant.added_items[product_id] = 1;
        }
        $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini"  ><span class="countBubl">' + etmRestaurant.item_count + '</span><span class="check">Checkout</span></a>');
        $('.count_item_' + product_id).html('<span class=" cnt_item ">' + ((etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) ? etmRestaurant.added_items[product_id].quantity : etmRestaurant.added_items[product_id]) + '</span>');
        if ($('.delete_bubbl' + product_id).html() == "") {
            $('.delete_bubbl' + product_id).html('<span class="delete_bubble" prod_key="' + product_id + '">x</span>');
        }
        return;
    }
    if ($('#' + $(this).attr('id') + ' input[name=\'bundle\'] ').val() == 1) {
        getProduct($(data).val(), product_bundle_html);
        return;
    }
    if ($('#' + $(this).attr('id') + ' input[name=\'option\'] ').val() == 1) {
        getProduct($(data).val(), products_option_html);
        return;
    }
}
function products_option_html(json) {
    tot_opt_count = 0;
    req_option_count = 0;
    req_options_radio = 0;
    req_options_chkbox = 0;
    html = '';
    html += '<h3>' + sessionStorage.prd_name + '</h3>';
    if (json['option']) {
        for (i in json['option']) {
            option = json['option'][i];
            if (option['type'] == 'select' || option['type'] == 'radio' || option['type'] == 'checkbox') {
                required = '';
                requiredhtml = '';
                if (option['required'] == 1) {
                    requiredhtml += '<span class="required">*</span> ';
                    required = 'requiredoption';
                    req_option_count += 1;
                }
                html += '<div id="option-' + option['product_option_id'] + '" class="main_options ' + required + '">';
                html += '<span class="optionname">' + requiredhtml + option['name'] + '</span></div>';
                opt_row = 1;
                if (option['type'] == 'checkbox') {
                    if (option['required'] == 1) {
                        req_options_chkbox += 1;
                    }
                    html += '<fieldset data-role="controlgroup" data-iconpos="right">';
                    for (j = 0; j < option['option_value'].length; j++) {
                        option_value = option['option_value'][j];
                        html += '<input type="checkbox" name="option[' + option['product_option_id'] + '][]" value="' + option_value['product_option_value_id'] + '"  id="checkbox-h-' + tot_opt_count + 'a">';
                        html += '<label for="checkbox-h-' + tot_opt_count + 'a">' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '</label>';
                        tot_opt_count++;
                    }
                    html += '</fieldset>';
                }
                else if (option['type'] == 'select') {
                    if (option['option_value'].length == 1) {
                        option_value = option['option_value'][0];
                        html += '<a class="ui-btn" optval="' + option_value['product_option_value_id'] + '">' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '<input type="hidden" name="option[' + option['product_option_id'] + ']" value="' + option_value['product_option_value_id'] + '"/></a>';
                    }
                    else {
                        html += ' <div class="ui-field-contain">';
                        html += '<select data-theme="a" name="option[' + option['product_option_id'] + ']"  id="select-custom-22_' + tot_opt_count + 'a" data-native-menu="false">';
                        if (option['required'] != 1) {
                            html += '<option  data-placeholder="true" value="">Choose </option>';
                        }
                        for (j = 0; j < option['option_value'].length; j++) {
                            option_value = option['option_value'][j];
                            html += '<option value="' + option_value['product_option_value_id'] + '">' + option_value['name'];
                            if (option_value['price']) {
                                html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                            }
                            html += '</option>';
                        }
                        html += '</select>';
                        html += '</div>';
                    }
                    tot_opt_count++;
                }
                else {
                    if (option['required'] == 1) {
                        req_options_radio += 1;
                        req_class = "reqr_class";
                    }
                    html += ' <fieldset data-role="controlgroup"  class="radio_field" >';
                    for (j = 0; j < option['option_value'].length; j++) {
                        option_value = option['option_value'][j];
                        html += '<input type="radio" class="' + req_class + '" name="option[' + option['product_option_id'] + ']" value="' + option_value['product_option_value_id'] + '" id="radio-choice-t-6' + tot_opt_count + 'a">';
                        html += '<label for="radio-choice-t-6' + tot_opt_count + 'a">' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '</label>';
                        tot_opt_count++;
                    }
                    html += '</fieldset>';
                }
                opt_row++;
            }
            if (option['type'] == 'image') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<select name="option[' + option['product_option_id'] + ']" id="selectbox">';
                html += '<option value=""></option>';
                for (j = 0; j < option['option_value'].length; j++) {
                    option_value = option['option_value'][j];
                    html += '<option value="' + option_value['product_option_value_id'] + '">' + option_value['name'];
                    if (option_value['price']) {
                        html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                    }
                    html += '</option>';
                }
                html += '</select>';
                html += '</div>';
            }
            if (option['type'] == 'text') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" />';
                html += '</div>';
            }
            if (option['type'] == 'textarea') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<textarea name="option[' + option['product_option_id'] + ']" cols="40" rows="5">' + option['option_value'] + '</textarea>';
                html += '</div>';
            }
            if (option['type'] == 'date') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="date" />';
                html += '</div>';
            }
            if (option['type'] == 'datetime') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="datetime" />';
                html += '</div>';
            }
            if (option['type'] == 'time') {
                html += '<div id="option-' + option['product_option_id'] + '">';
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="time" />';
                html += '</div>';
            }
        }
    }
    $("#formprodutOption #products_option").html(html);
    $("#formprodutOption #products_option").trigger('create');
    $.mobile.changePage('#pageProductsOptions');
}
function products_descr_html(json) {
    html = '';
    html += '<div><h3>' + json['name'] + '</h3>';
    html += '<h3>' + (json['price'] ? json['price'] : '') + '</h3>';
    if (json['image']) {
        html += '<div>' + json['image'] + '</div>';
    }
    if (json['description']) {
        html += '<div>' + json['description'] + '</div>';
    }
    html += '</div>';
    $('#prd_description').html(html);
    $('#popupProductDescr').popup("open");
}
function product_bundle_html(json) {
    etmRestaurant.deal_opt_count = 0;
    html = '';
    $('.prod_bundle_name').html(sessionStorage.prd_name);
    bunpro_dispaly_items = 10;
    html += ' <div>';
    html += '<a href="#" class="ui-btn ui-btn-b ui-btn-inline ui-mini popup_cancel_btn" data-rel="back"  >Back</a>';
    html += '<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini btn_bundle_addtocart"  >Add To Cart</a>';
    html += ' </div>';
    html += ' <div id="bundle_menus">';
    if (json['bundled_items']) {
        var bundledidval = 1;
        var bundledcount = json['bundled_items'].length;
        for (b = 0; b < json['bundled_items'].length; b++) {
            qty = json['bundled_items'][b]['bundled_qty'];
            if (qty > 1) {
                bundledcount += (qty - 1);
            }
            requiredhtml = '<span class="required">*</span>';
            required = 'bund_product_required';
            html += '<div data-role="collapsibleset">';
            for (k = 0; k < qty; k++) {
                if (bundledidval < bundledcount) {
                    finsish = 0;
                }
                else {
                    finsish = 1;
                }
                bunrow = 1;
                bunprodtcount = 0;
                rowstatus = false;
                totbubdprodutcs = json['bundled_items'][b]['products'].length;
                html += '<div data-role="collapsible" class="collapseheading" data-iconpos="right" id="collapse_bundled_options_' + bundledidval + '">';
                html += '<h4>' + json['bundled_items'][b]['bundle_name'] + '';
                html += ' ' + bundledidval + '/' + bundledcount + '</h4> ';
                html += '<div class="bundle_select">';
                html += '<fieldset data-role="controlgroup" data-mini="true" class="fieldset_collapse" >';
                html += '<select name="bundled_product[' + bundledidval + ']" class="bundled-single-product" id="select-custom-21_' + bundledidval + '" bundidval="' + bundledidval + '" div_id="' + bundledidval + '" data-native-menu="false">';
                html += '<option data-placeholder="true" value="">Choose</option>';
                for (bp in json['bundled_items'][b]['products']) {
                    bunprodtcount += 1;
                    html += '<option value="' + json['bundled_items'][b]['bundled_id'] + '_' + k + '_' + json['bundled_items'][b]['products'][bp]['product_id'] + '"   >' + json['bundled_items'][b]['products'][bp]['name'] + '</option>';
                }
                html += '</select>';
                html += '</fieldset>';
                html += '</div>';
                html += '<div  id="bundled_options_' + bundledidval + '" class="bundoptclass"></div>';
                html += '</div>';
                bundledidval += 1;
            }
            html += ' </div>';
        }
    }
    html += ' </div>';
    etmRestaurant.deal_opt_count = bundledcount;
    sessionStorage.setItem("bundleditem_count", bundledcount);
    $("#bundled_items").html(html);
    $('#bundled_items').trigger('create');
    $.mobile.changePage('#pageBundled');
}
function products_bund_option_html(json, idd, bundidval) {
    tot_opt_count = 0;
    req_options_radio = [];
    req_options_radio[bundidval] = 0;
    req_options_chkbox = 0;
    req_total_count = 0;
    html = '';
    req_class = '';
    etmRestaurant.req_radio_count = 0;
    if (json['option']) {
        for (i in json['option']) {
            option = json['option'][i];
            if (option['type'] == 'select' || option['type'] == 'radio' || option['type'] == 'checkbox') {
                required = '';
                requiredhtml = '';
                if (option['required'] == 1) {
                    requiredhtml += '<span class="required">*</span> ';
                    required = 'requiredoption';
                    req_total_count += 1;
                }
                html += '<span class="optionname"><small><h3>' + requiredhtml + option['name'] + '</h3></small></span>';
                opt_row = 1;
                if (option['type'] == 'checkbox') {
                    if (option['required'] == 1) {
                        req_options_chkbox += 1;
                    }
                    html += '<fieldset data-role="controlgroup" data-iconpos="right" class="fieldset_' + bundidval + '">';
                    for (j = 0; j < option['option_value'].length; j++) {
                        option_value = option['option_value'][j];
                        html += '<input type="checkbox" name="bundledoption[' + idd + '][' + option['product_option_id'] + '][]" value="' + option_value['product_option_value_id'] + '"  id="checkbox-h-' + tot_opt_count + 'a">';
                        html += '<label for="checkbox-h-' + tot_opt_count + 'a"><small>' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '</small></label>';
                        tot_opt_count++;
                    }
                    html += '</fieldset>';
                }
                else if (option['type'] == 'select') {
                    html += '<select  name="bundledoption[' + idd + '][' + option['product_option_id'] + ']"  id="select-custom-21_' + tot_opt_count + '_' + bundidval + 'a" data-native-menu="false" >';
                    if (option['required'] != 1) {
                        html += '<option  data-placeholder="true" value="">Choose </option>';
                    }
                    for (j = 0; j < option['option_value'].length; j++) {
                        option_value = option['option_value'][j];
                        html += '<option value="' + option_value['product_option_value_id'] + '"><small>' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '</small></option>';
                    }
                    tot_opt_count++;
                    html += '</select>';
                }
                else {
                    if (option['required'] == 1) {
                        req_options_radio[bundidval] += 1;
                        req_class = "required_class";
                        etmRestaurant.req_radio_count += 1;
                    }
                    html += ' <fieldset data-role="controlgroup"  class="fieldset_' + bundidval + '" >';
                    for (j = 0; j < option['option_value'].length; j++) {
                        option_value = option['option_value'][j];
                        html += '<input type="radio" class="' + req_class + '" name="bundledoption[' + idd + '][' + option['product_option_id'] + ']" value="' + option_value['product_option_value_id'] + '" id="radio-choice-t-6' + tot_opt_count + 'a">';
                        html += '<label for="radio-choice-t-6' + tot_opt_count + 'a"><small>' + option_value['name'];
                        if (option_value['price']) {
                            html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                        }
                        html += '</small></label>';
                        tot_opt_count++;
                    }
                    html += '</fieldset>';
                }
                opt_row++;
            }
            if (option['type'] == 'image') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<select name="option[' + option['product_option_id'] + ']">';
                html += '<option value=""></option>';
                for (j = 0; j < option['option_value'].length; j++) {
                    option_value = option['option_value'][j];
                    html += '<option value="' + option_value['product_option_value_id'] + '">' + option_value['name'];
                    if (option_value['price']) {
                        html += ' (' + option_value['price_prefix'] + option_value['price'] + ')';
                    }
                    html += '</option>';
                }
                html += '</select>';
            }
            if (option['type'] == 'text') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" />';
            }
            if (option['type'] == 'textarea') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<textarea name="option[' + option['product_option_id'] + ']" cols="40" rows="5">' + option['option_value'] + '</textarea>';
            }
            if (option['type'] == 'date') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="date" />';
            }
            if (option['type'] == 'datetime') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="datetime" />';
            }
            if (option['type'] == 'time') {
                if (option['required']) {
                    html += '<span class="required">*</span> ';
                }
                html += option['name'] + '<br />';
                html += '<input type="text" name="option[' + option['product_option_id'] + ']" value="' + option['option_value'] + '" class="time" />';
            }
        }
    }
    $('#bundled_options_' + bundidval).addClass("bundoptdiv");
    $('#bundled_options_' + bundidval).html(html);
    $('#bundled_options_' + bundidval).trigger('create');
}
function change_bundle_product() {
    idd = $(this).val();
    etmRestaurant.deal_selected_count += 1;
    prod_split = idd.split('_');
    prod = 0;
    product_id = prod_split[0] + '_' + prod + '_' + prod_split[2];
    bundidval = $(this).attr('bundidval');
    if (etmRestaurant.selected_product['bundled_items']) {
        var bundledcount = etmRestaurant.selected_product['bundled_items'].length;
        for (b = 0; b < bundledcount; b++) {
            if (etmRestaurant.selected_product['bundled_items'][b]['bundled_id'] == prod_split[0]) {
                for (c = 0; c < etmRestaurant.selected_product['bundled_items'][b]['products'].length; c++) {
                    if (etmRestaurant.selected_product['bundled_items'][b]['products'][c]['product_id'] == prod_split[2]) {
                        products_bund_option_html(etmRestaurant.selected_product['bundled_items'][b]['products'][c], idd, bundidval);
                        return 0;
                    }
                }
            }
        }
    }
}
function click_delete_bubble() {
    sessionStorage.removeItem("del_prod_key");
    sessionStorage.removeItem("delete_item_key");
    if ($(this).attr('prod_key')) {
        sessionStorage.setItem("del_prod_key", $(this).attr('prod_key'));
    }
    if ($(this).attr('delete_item_key')) {
        sessionStorage.setItem("delete_item_key", $(this).attr('delete_item_key'));
    }
    $('#popup_delete_item').popup("open");
}
function delete_ok() {
    etmRestaurant.item_count -= ((etmRestaurant.added_items[sessionStorage.del_prod_key] != null && etmRestaurant.added_items[sessionStorage.del_prod_key].quantity > 0) ? etmRestaurant.added_items[sessionStorage.del_prod_key].quantity : etmRestaurant.added_items[sessionStorage.del_prod_key]);
    if (sessionStorage.delete_item_key) {
        sessionStorage.setItem("delete_keys_array");
        etmRestaurant.delete_keys_arr[etmRestaurant.delete_keys_arr.length] = sessionStorage.delete_item_key;
        if (etmRestaurant.added_items[sessionStorage.del_prod_key] != null && etmRestaurant.added_items[sessionStorage.del_prod_key].quantity > 0) {
            $('.delete_bubbl' + sessionStorage.del_prod_key).html('');
            $('.count_item_' + sessionStorage.del_prod_key).html('');
            etmRestaurant.added_items[sessionStorage.del_prod_key].quantity = 0;
            etmRestaurant.added_items[sessionStorage.del_prod_key] = 0;
        }
    }
    for (i = etmRestaurant.temp_itemcount; i < etmRestaurant.cart.length; i++) {
        str = decodeURI(etmRestaurant.cart[i]);
        var pairs = str.split('&');
        var obj = {}, p, idx, val;
        for (var j = 0, n = pairs.length; j < n; j++) {
            p = pairs[j].split('=');
            idx = p[0];
            if (idx.indexOf("[]") == (idx.length - 2)) {
                var ind = idx.substring(0, idx.length - 2);
                if (obj[ind] === undefined) {
                    obj[ind] = [];
                }
                obj[ind].push(p[1]);
            }
            else {
                obj[idx] = p[1];
            }
            break;
        }
        if (typeof (obj['product_id']) != 'undefined') {
            if (obj['product_id'] == sessionStorage.del_prod_key) {
                if (i > -1) {
                    $('.delete_bubbl' + obj['product_id']).html('');
                    $('.count_item_' + obj['product_id']).html('');
                    etmRestaurant.cart.splice(i, 1);
                    etmRestaurant.added_items[sessionStorage.del_prod_key] = 0;
                }
            }
        }
    }
    if (etmRestaurant.item_count > 0) {
        $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini " ><span class="countBubl">' + etmRestaurant.item_count + '</span><span class="check">Checkout</span></a>');
    }
    else {
        $('.btn_checkout').html('');
    }
}
function click_btn_addtocart() {
    $('#pageProductsOptions .warning').removeClass('warning');
    radio_req = $('.reqr_class').length;
    radio_checked = $('.radio_field input[type="radio"]:checked').length;
    if (radio_checked < radio_req) {
        $('.reqr_class').addClass('warning');
        $('.ui-radio label').addClass('warning');
        blink(".warning", 4, 1000);
        return 0;
    }
    localStorage.removeItem("confirmed_order");
    etmRestaurant.cart[etmRestaurant.item_count] = $('#formprodutOption').serialize();
    etmRestaurant.item_count++;
    product_id = $('#formprodutOption input[name=\'product_id\']').val();
    if (etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) {
        etmRestaurant.added_items[product_id].quantity += 1;
    }
    else if (etmRestaurant.added_items[product_id]) {
        etmRestaurant.added_items[product_id] += 1;
    }
    else {
        etmRestaurant.added_items[product_id] = 1;
    }
    $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini" ><span class="check">Checkout</span><span class="countBubl">' + etmRestaurant.item_count + '</span></a>');
    $('.count_item_' + product_id).html('<span class="cnt_item ">' + ((etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) ? etmRestaurant.added_items[product_id].quantity : etmRestaurant.added_items[product_id]) + '</span>');
    if ($('.delete_bubbl' + product_id).html() == "") {
        $('.delete_bubbl' + product_id).html('<span class="delete_bubble" prod_key="' + product_id + '">x</span>');
    }
    $.mobile.changePage('#pageProducts');
}
function click_btn_bundle_addtocart() {
    $('#pageBundled .warning').removeClass('warning');
    flag_radio_err = 0;
    if (etmRestaurant.deal_selected_count >= 1) {
        for (i = 1; i <= etmRestaurant.deal_opt_count; i++) {
            if ($('.fieldset_collapse #select-custom-21_' + i).val() == "") {
                $('#collapse_bundled_options_' + i + ' h4 a').addClass('warning');
                flag_radio_err = 1;
            }
            radio_req = $('.fieldset_' + i + ' .required_class').length;
            radio_checked = $('.fieldset_' + i + ' input[type="radio"]:checked').length;
            if (radio_checked < radio_req) {
                $('#collapse_bundled_options_' + i + ' h4 a').addClass('warning');
                $('.fieldset_' + i + ' .ui-radio label').addClass('warning');
                flag_radio_err = 1;
            }
        }
        if (flag_radio_err == 0) {
            localStorage.removeItem("confirmed_order");
            product_id = $('#formprodutBundleOption input[name=\'product_id\']').val();
            if (etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) {
                etmRestaurant.added_items[product_id].quantity += 1;
            }
            else if (etmRestaurant.added_items[product_id]) {
                etmRestaurant.added_items[product_id] += 1;
            }
            else {
                etmRestaurant.added_items[product_id] = 1;
            }
            etmRestaurant.cart[etmRestaurant.item_count++] = $('#formprodutBundleOption').serialize();
            $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini " ><span class="countBubl">' + etmRestaurant.item_count + '</span><span class="check">Checkout</span></a>');
            $('.count_item_' + product_id).html('<span class=" cnt_item ">' + ((etmRestaurant.added_items[product_id] != null && etmRestaurant.added_items[product_id].quantity > 0) ? etmRestaurant.added_items[product_id].quantity : etmRestaurant.added_items[product_id]) + '</span>');
            if ($('.delete_bubbl' + product_id).html() == "") {
                $('.delete_bubbl' + product_id).html('<span class="delete_bubble" prod_key="' + product_id + '">x</span>');
            }
            $.mobile.changePage('#pageProducts');
        }
        else {
            var errorDiv = $('.warning:first()');
            var scrollPos = errorDiv.offset().top;
            $(window).scrollTop(scrollPos);
        }
    }
    else {
        $('.collapseheading h4 a').addClass('warning');
    }
    blink(".warning", 5, 1000);
}
function blink(elem, times, speed) {
    if (times > 0 || times < 0) {
        if ($(elem).hasClass("blink"))
            $(elem).removeClass("blink");
        else
            $(elem).addClass("blink");
    }
    clearTimeout(function() {
        blink(elem, times, speed);
    });
    if (times > 0 || times < 0) {
        setTimeout(function() {
            blink(elem, times, speed);
        }, speed);
        times -= .5;
    }
}
function change_select() {
    $('#pageProductsOptions .warning').removeClass('warning');
    $('#pageBundled .warning').removeClass('warning');
}
function click_btn_dealskip() {
    $.mobile.changePage('#pageCart');
}
function  checkout() {
    sessionStorage.setItem("checkout_button", "yes");
    cartdetails();
}
function checkcoupon() {
    $('#error_textbox').html('');
    $('#div_coupon_error').html('');
    $('#div_voucher_error').html('');
    $('#div_reward_error').html('');
    if ($.trim($('#txt_coupon').val()).length <= 0 && $.trim($('#txt_voucher').val()).length <= 0 && $.trim($('#txt_reward').val()).length <= 0) {
        $('#error_textbox').html('<span class="error" ><small>Enter Coupon/Voucher/Reward</small></span>');
    }
    else {
        cartdetails();
    }
}
function confirmation() {
    sessionStorage.setItem("delete_item_key", $(this).attr('item_key'));
    $('#deleteConfirm').popup("open");
}
function cartdetails() {
    show_loading_icon();
    if (localStorage.customer_id) {
        if (sessionStorage.default_address_id) {
        }
        else {
            sessionStorage.setItem("default_address_id", localStorage.address_id);
        }
        if ($(this).attr('smartdeal_id')) {
            data = {customer_id: localStorage.customer_id, address_id: sessionStorage.default_address_id, suggested_dealid: $(this).attr('smartdeal_id')};
        }
        else {
            data = {customer_id: localStorage.customer_id, address_id: sessionStorage.default_address_id, products: JSON.stringify(etmRestaurant.cart)};
        }
        if (sessionStorage.delete_item_key) {
            data.remove = sessionStorage.delete_item_key;
        }
        if ($(this).attr('plus_qty_key')) {
            data.update = $(this).attr('plus_qty_key');
            data.quantity = $(this).attr('plus_qty');
        }
        if ($(this).attr('minus_qty_key')) {
            data.update = $(this).attr('minus_qty_key');
            data.quantity = $(this).attr('minus_qty');
        }
        if (sessionStorage.del_prod_key) {
            data.remove = sessionStorage.del_prod_key;
            sessionStorage.removeItem("del_prod_key");
            if (sessionStorage.delete_keys_array) {
                sessionStorage.removeItem("delete_keys_array");
                data.remove = etmRestaurant.delete_keys_arr;
            }
        }
        if ($.trim($('#txt_coupon').val()).length > 0) {
            sessionStorage.setItem("coupon", $('#txt_coupon').val());
            data.coupon = sessionStorage.coupon;
            sessionStorage.removeItem("validcoupon");
        }
        if ($.trim($('#txt_reward').val()).length > 0) {
            sessionStorage.setItem("reward", $('#txt_reward').val());
            data.reward = sessionStorage.reward;
            sessionStorage.removeItem("validreward");
        }
        if ($.trim($('#txt_voucher').val()).length > 0) {
            sessionStorage.setItem("voucher", $('#txt_voucher').val());
            data.voucher = sessionStorage.voucher;
            sessionStorage.removeItem("validvoucher");
        }
        if (sessionStorage.validcoupon) {
            data.coupon = sessionStorage.validcoupon;
        }
        if (sessionStorage.validreward) {
            data.reward = sessionStorage.validreward;
        }
        if (sessionStorage.validvoucher) {
            data.voucher = sessionStorage.validvoucher;
        }
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'cartdetails',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    etmRestaurant.cart = [];
                    etmRestaurant.added_items = [];
                    etmRestaurant.delete_keys_arr = [];
                    json = JSON.parse(response.data);
                    $.mobile.loading("hide");
                    displayCartdetails(json);
                }
                catch (e) {
                    etmRestaurant.error_continue_page = cartdetails;
                    catch_errors(e, "Error - 110");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = cartdetails;
                        connection_errors("Error -  C 110");
                    });
        }
        else {
            etmRestaurant.error_continue_page = cartdetails;
            connection_errors("Error -  C1 110");
        }
    }
    else {
        $.mobile.loading("hide");
        $.mobile.changePage('#pageLogin');
    }
}
function displayCartdetails(json) {
    try {
        $('#tab-product-epos').html('');
        $('#product-epos-total').html('');
        $('#div_coupon').html('');
        $('#div_voucher').html('');
        $('#div_reward').html('');
        $('.count_btn').html('');
        $('.btn_checkout').html('');
        $('#table_products').html('');
        $('#error_textbox').html('');
        $('#div_coupon_error').html('');
        $('#div_voucher_error').html('');
        $('#div_reward span').html('');
        table_html = '';
        etmRestaurant.item_count = 0;
        btn_checkout_qty = 0;
        flag_smartdeals = 0;
        if (json['products']) {
            table_html += '<table data-role="table" id="tab_prod" data-mode="columntoggle" class="ui-responsive table-stroke">';
            table_html += '<tbody>';
            for (prdkey in json['products']) {
                btn_checkout_qty += json['products'][prdkey].quantity;
                etmRestaurant.added_items[json['products'][prdkey].product_id] = {'quantity': json['products'][prdkey].quantity, 'key': prdkey};
                table_html += '<tr id="table_prod_head">';
                table_html += '<td><span class="delete_item" item_key="' + prdkey + '">x</span></td>';
                table_html += '<td >' + json['products'][prdkey].name + '<br />';
                if (json['products'][prdkey].bundle) {
                    table_html += '<label class="pname">';
                    for (bnd in json['products'][prdkey].bundle) {
                        table_html += '<strong>' + json['products'][prdkey].bundle[bnd].name + '</strong><br />';
                        if (json['products'][prdkey].bundle[bnd].option) {
                            for (bndopt in json['products'][prdkey].bundle[bnd].option) {
                                table_html += '--' + json['products'][prdkey].bundle[bnd].option[bndopt].name + ':' + json['products'][prdkey].bundle[bnd].option[bndopt].value + '<br />';
                            }
                        }
                    }
                    table_html += '</label>';
                }
                if (json['products'][prdkey].option) {
                    table_html += '<label class="pname">';
                    for (optns in json['products'][prdkey].option) {
                        table_html += '-' + json['products'][prdkey].option[optns].name + ':' + json['products'][prdkey].option[optns].value + '<br />';
                    }
                    table_html += '</label>';
                }
                table_html += '</td >';
                table_html += '<td ><span class="minus_quantity" minus_qty_key="' + prdkey + '" minus_qty="' + (json['products'][prdkey].quantity - 1) + '"> - </span></td>';
                table_html += '<td >' + json['products'][prdkey].quantity + '</td>';
                table_html += '<td ><span class="plus_quantity" plus_qty_key="' + prdkey + '" plus_qty="' + (json['products'][prdkey].quantity + 1) + '"> + </span></td>';
                table_html += '<td>' + json['products'][prdkey].total + '</td>';
                table_html += '</tr>';
            }
            if (json['totals']) {
                for (tots in json['totals']) {
                    table_html += '<tr>';
                    table_html += '<td  colspan="5"  id="tot">' + json['totals'][tots].title + '  :  </td><td id="tot_text">' + json['totals'][tots].text + '</td>';
                    table_html += '</tr>';
                }
            }
            table_html += '</tbody></table>';
            etmRestaurant.item_count = btn_checkout_qty;
        }
        $('#table_products').html(table_html);
        $('#table_products').trigger('create');
        flag_coupon = 0;
        if (json['coupon'] == "yes") {
            $('#div_coupon').append('<div>Coupon :<input type="text" name="coupon" id="txt_coupon"></div>');
            if (json['error_coupon']) {
                $('#div_coupon_error').html('<span class="error" ><small>' + json['error_coupon'] + '</small></span>');
                $('#txt_coupon').val('');
            }
            else if (sessionStorage.coupon) {
                sessionStorage.setItem("validcoupon", sessionStorage.coupon);
            }
            flag_coupon = 1;
        }
        if (json['voucher'] == "yes") {
            $('#div_voucher').append('<div>Voucher :<input type="text" name="voucher" id="txt_voucher"></div>');
            if (json['error_voucher']) {
                $('#div_voucher_error').append('<span class="error" ><small>' + json['error_voucher'] + '</small></span>');
                $('#txt_voucher').val('');
            }
            else if (sessionStorage.voucher) {
                sessionStorage.setItem("validvoucher", sessionStorage.voucher);
            }
            flag_coupon = 1;
        }
        if (json['reward'] == "yes") {
            $('#div_reward').append('<div>Reward :<input type="text" name="reward" id="txt_reward"></div>');
            if (json['error_reward']) {
                $('#div_reward_error').append('<span class="error" ><small>' + json['error_reward'] + '</small></span>');
                $('#txt_reward').val('');
            }
            else if (sessionStorage.reward) {
                sessionStorage.setItem("validreward", sessionStorage.reward);
            }
            flag_coupon = 1;
        }
        $('#div_coupon').trigger('create');
        $('#div_voucher').trigger('create');
        $('#div_reward').trigger('create');
        if (json['shipping_methodes']) {
            if (json['shipping_methodes'] == "") {
                sessionStorage.setItem("null_shipping_method", "yes");
            }
            else {
                if (sessionStorage.null_shipping_method) {
                    sessionStorage.removeItem("null_shipping_method");
                }
            }
            ship_html = '';
            ship_html += '<fieldset data-role="controlgroup" data-theme="b" data-type="horizontal" data-mini="true" id="radio_shipping">';
            ship_html += '<legend>Shipping :</legend>';
            if (sessionStorage.checked_shipping_method) {
                for (sm in json['shipping_methodes']) {
                    if (sessionStorage.checked_shipping_method == "undefined") {
                        ship_html += '<input type="radio" name="shipping_method" id="radio-choice-t-6' + sm + '" value="' + json['shipping_methodes'][sm].quote[sm].code + '" checked="checked" >';
                        ship_html += '<label for="radio-choice-t-6' + sm + '">' + json['shipping_methodes'][sm].title + '</label>';
                    }
                    else if (json['shipping_methodes'][sm].quote[sm].code == sessionStorage.checked_shipping_method) {
                        sessionStorage.removeItem("checked_shipping_method");
                        ship_html += '<input type="radio" name="shipping_method" id="radio-choice-t-6' + sm + '" value="' + json['shipping_methodes'][sm].quote[sm].code + '" checked="checked" >';
                    }
                    else {
                        ship_html += '<input type="radio" name="shipping_method" id="radio-choice-t-6' + sm + '" value="' + json['shipping_methodes'][sm].quote[sm].code + '" >';
                    }
                    ship_html += '<label for="radio-choice-t-6' + sm + '">' + json['shipping_methodes'][sm].title + '</label>';
                }
            }
            else {
                for (sm in json['shipping_methodes']) {
                    ship_html += '<input type="radio" name="shipping_method" id="radio-choice-t-6' + sm + '" value="' + json['shipping_methodes'][sm].quote[sm].code + '" checked="checked" >';
                    ship_html += '<label for="radio-choice-t-6' + sm + '">' + json['shipping_methodes'][sm].title + '</label>';
                }
            }
            ship_html += '<h3 id="ship_error" class="error"></h3>';
            ship_html += '</fieldset>';
            $('#ship_method').html(ship_html);
        }
        if (json['payment_methodes']) {
            payment_html = '';
            payment_html += '<fieldset data-role="controlgroup" data-theme="b" data-type="vertical" data-mini="true" id="radio_payment">';
            payment_html += '<legend>Payment :</legend>';
            if (sessionStorage.checked_payment_method) {
                for (pm in json['payment_methodes']) {
                    if (json['payment_methodes'][pm].code == sessionStorage.checked_payment_method) {
                        sessionStorage.removeItem("checked_payment_method");
                        payment_html += '<input type="radio" name="payment_method" id="radio-choice-t-7' + pm + '" value="' + json['payment_methodes'][pm].code + '" checked="checked" >';
                    }
                    else {
                        payment_html += '<input type="radio" name="payment_method" id="radio-choice-t-7' + pm + '" value="' + json['payment_methodes'][pm].code + '" >';
                    }
                    payment_html += '<label for="radio-choice-t-7' + pm + '">' + json['payment_methodes'][pm].title + '</label>';
                }
            }
            else {
                for (pm in json['payment_methodes']) {
                    payment_html += '<input type="radio" name="payment_method" id="radio-choice-t-7' + pm + '" value="' + json['payment_methodes'][pm].code + '" checked="checked"  >';
                    payment_html += '<label for="radio-choice-t-7' + pm + '">' + json['payment_methodes'][pm].title + '</label>';
                }
            }
            payment_html += '</fieldset>';
            $('#payment_method').html(payment_html);
        }
        if (json['requested_times']) {
            req_html = '';
            req_html += '<legend>Time Preference :</legend>';
            if (sessionStorage.req_delivery) {
                req_html += '<span >Delivery @ </span><span id="reqstd_time">' + sessionStorage.option_req_delivery + '</span>';
                req_delivery_time = sessionStorage.req_delivery;
            }
            else {
                for (rt in json['requested_times']) {
                    req_html += '<span >Delivery @ </span><span id="reqstd_time">' + json['requested_times'][rt] + '</span>';
                    req_delivery_time = rt;
                    break;
                }
            }
            req_html += '<select name="select_reqtime" id="select_delivery_time" data-native-menu="false">';
            req_html += '<option  data-placeholder="true" value="">Change Time ? </option>';
            for (rt in json['requested_times']) {
                req_html += '<option value="' + rt + '" >' + json['requested_times'][rt] + '</option>';
            }
            req_html += '</select>';
            $('#requested_time').html(req_html);
        }
        $("#btn_review").attr("req_delivery_time", req_delivery_time);
        if (flag_coupon == 1) {
            btn_html = '';
            btn_html += '<div><a href="#" class="ui-btn ui-btn-c  ui-btn-inline ui-mini" id="btn_coupon" >Validate</a></div>';
            $('.next_btn').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini" id="btn_skip">Continue</a>');
            $('#div_submit').html(btn_html);
        }
        else {
            $('.next_btn').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini" id="btn_skip">Continue</a>');
        }
        if (json['smart_deals']) {
            deals = '';
            deals += '<div class="ui-grid-a"><div class="ui-block-a"><strong>In Cart</strong></div><div class="ui-block-b"><strong>In Deal</strong></div><hr/>';
            if (json['smart_deals'].smart_deals) {
                for (sd in json['smart_deals'].smart_deals) {
                    if (json['smart_deals'].smart_deals[sd].available) {
                        flag_smartdeals = 1;
                        for (sd_avail in json['smart_deals'].smart_deals[sd].available) {
                            deals += '<div class="ui-block-a">' + json['smart_deals'].smart_deals[sd].available[sd_avail].name + '</div>';
                            deals += '<div class="ui-block-b">' + json['smart_deals'].smart_deals[sd].available[sd_avail].name + '</div>';
                            deals += '<div class="ui-block-a">' + json['smart_deals'].smart_deals[sd].available[sd_avail].options[0].name + ':' + json['smart_deals'].smart_deals[sd].available[sd_avail].options[0].option_value[0].name + '</div>';
                            deals += '<div class="ui-block-b">' + json['smart_deals'].smart_deals[sd].available[sd_avail].options[0].name + ':' + json['smart_deals'].smart_deals[sd].available[sd_avail].options[0].option_value[0].name + '</div>';
                        }
                        if (json['smart_deals'].smart_deals[sd].suggestion) {
                            for (sd_sugg in json['smart_deals'].smart_deals[sd].suggestion) {
                                deals += '<div class="ui-block-b">+' + json['smart_deals'].smart_deals[sd].suggestion[sd_sugg].name + '</div>';
                                deals += '<div class="ui-block-a">' + json['smart_deals'].smart_deals[sd].suggestion[sd_sugg].options[0].name + ':' + json['smart_deals'].smart_deals[sd].available[sd_sugg].options[0].option_value[0].name + '</div>';
                            }
                        }
                        if (json['smart_deals'].smart_deals[sd].total_cart_price) {
                            deals += '<div class="ui-block-a"> &pound;' + json['smart_deals'].smart_deals[sd].total_cart_price + '</div>';
                        }
                        if (json['smart_deals'].deals[sd].price) {
                            deals += '<div class="ui-block-b"> &pound;' + json['smart_deals'].deals[sd].price + '</div>';
                            deal_name = json['smart_deals'].deals[sd].name;
                        }
                        if (json['smart_deals'].smart_deals[sd].total_cart_price && json['smart_deals'].deals[sd].price) {
                            tot_save = parseFloat(json['smart_deals'].smart_deals[sd].total_cart_price) - parseFloat(json['smart_deals'].deals[sd].price);
                            deals += '<div class="ui-block-a">You Can Save &pound;' + tot_save + ',Use ' + deal_name + ':</div>';
                            deals += '<div class="ui-block-b"><a href="#" class="ui-btn ui-btn-inline ui-mini btn_smartdeal_yes" smartdeal_id="' + sd + '">Yes</a><a href="#" class="ui-btn ui-btn-inline ui-mini btn_dealskip" >NO</a></div><hr/>';
                        }
                    }
                }
            }
            deals += '</div>';
            $('#smartdeals').html(deals);
        }
        if (etmRestaurant.item_count > 0) {
            etmRestaurant.temp_itemcount = etmRestaurant.item_count;
            $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini"><span class="countBubl">' + btn_checkout_qty + '</span><span class="check">Checkout</span></a>');
            if (sessionStorage.change_ship_address) {
                sessionStorage.removeItem("change_ship_address");
                shipdetails();
            }
            else if (sessionStorage.checkout_button) {
                if (sessionStorage.from_loginpage) {
                    sessionStorage.removeItem("from_loginpage");
                }
                sessionStorage.removeItem("checkout_button");
                if (flag_smartdeals == 1) {
                    $.mobile.changePage("#pageSmartDeals");
                }
                else {
                    $.mobile.changePage("#pageCart");
                }
                $('#trigger').trigger('create');
            }
            else if (sessionStorage.from_orderhistory) {
                sessionStorage.removeItem("from_orderhistory");
                $.mobile.changePage('#pageHistory');
            }
            else if (sessionStorage.from_reward) {
                sessionStorage.removeItem("from_reward");
                $.mobile.changePage('#pageRewards');
            }
            else if (sessionStorage.from_edit) {
                sessionStorage.removeItem("from_edit");
                $.mobile.changePage('#pageEdit');
            }
            else if (sessionStorage.from_changepasswaord) {
                sessionStorage.removeItem("from_changepasswaord");
                $.mobile.changePage('#pageChangePassword');
            }
            else if (sessionStorage.from_editaddress) {
                sessionStorage.removeItem("from_editaddress");
                $.mobile.changePage('#pageAddress');
            }
            else if (sessionStorage.from_orderstat) {
                sessionStorage.removeItem("from_orderstat");
                $.mobile.changePage("#pageOrderStatus");
            }
            else if (sessionStorage.from_settings) {
                sessionStorage.removeItem("from_settings");
                settings();
            }
            else if (sessionStorage.from_loginpage) {
                sessionStorage.removeItem("from_loginpage");
                $.mobile.changePage("#pageHome");
            }
            else {
                $.mobile.changePage("#pageCart");
                $('#trigger').trigger('create');
            }
            $('.btn_checkout').html('<a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini"><span class="countBubl">' + btn_checkout_qty + '</span><span class="check">Checkout</span></a>');
        }
        else {
            $.mobile.changePage("#pageHome");
        }
    }
    catch (e) {
    }
}
function shipdetails() {
    if (sessionStorage.null_shipping_method) {
        $('#address_msg').html('<span class="error">No Shipping available.Add New/Change Address.</span>');
        var errorDiv = $('#dialogPageAddress [data-role="header"]');
        var scrollPos = errorDiv.offset().top;
        $(window).scrollTop(scrollPos);
        $.mobile.changePage("#dialogPageAddress");
        return 0;
    }
    html = '';
    $('#address_msg').html('');
    if (localStorage.getItem("customer_addresses_" + localStorage.customer_id) !== "undefined") {
        customer_address = JSON.parse(localStorage.getItem("customer_addresses_" + localStorage.customer_id));
        for (i in customer_address) {
            if (sessionStorage.default_address_id == i) {
                html += '<li><p>' + customer_address[i].firstname + ' ' + customer_address[i].lastname + '</p>';
                html += '<p>' + customer_address[i].address_1 + '</p>';
                html += '<p>' + customer_address[i].postcode + '</p></li>';
                break;
            }
        }
        html += '<a href="#dialogPageAddress" class="ui-btn ui-btn-a ui-corner-all ui-btn-inline ui-mini id="change_address" data-transition="pop">Change Address</a>';
        $('#ship_addr ul').html(html);
    }
    $.mobile.changePage("#pageShipping");
    $('#ship_addr ul').listview('refresh');
    $('#ship_method').trigger('create');
    $('#payment_method').trigger('create');
    $('#requested_time').trigger('create');
}
function time_change() {
    if ($('#select_delivery_time').val() != "") {
        sessionStorage.setItem("req_delivery", $('#select_delivery_time').val());
        sessionStorage.setItem("option_req_delivery", $('#select_delivery_time option:selected').text());
        $('#reqstd_time').html(sessionStorage.option_req_delivery);
    }
}
function revieworder() {
    if (typeof $('input:radio[name="shipping_method"]:checked').val() == "undefined") {
        $('#ship_error').html("Select Shipping");
        return 0;
    }
    try {
        show_loading_icon();
        $('#payment_processes').html('<h3>Processing ...</h3>');
        if (sessionStorage.payment_method) {
            sessionStorage.removeItem("payment_method");
        }
        if (sessionStorage.req_delivery) {
            req_delivery_time = sessionStorage.req_delivery;
            $('#reqstd_time').html(sessionStorage.option_req_delivery);
            sessionStorage.removeItem("req_delivery");
            sessionStorage.removeItem("option_req_delivery");
        }
        else {
            req_delivery_time = $(this).attr('req_delivery_time');
        }
        data = {customer_id: localStorage.customer_id, address_id: sessionStorage.default_address_id, shipping_method: $('input:radio[name="shipping_method"]:checked').val(), payment_method: $('input:radio[name="payment_method"]:checked').val(), order_requested_time: req_delivery_time};
        if (sessionStorage.sel_address_id) {
            data.address_id = sessionStorage.sel_address_id;
        }
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'revieworder',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    review_html = '';
                    reviews = JSON.parse(response.data);
                    if (reviews['order_id'] != "") {
                        sessionStorage.setItem("order_id", reviews['order_id']);
                        review_html += '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke" id="tab_review" data-theme="a"><tbody>';
                        review_html += '<tr><td id="order_success_msg" colspan="2"></td></tr>';
                        review_html += '<tr><td><strong>Order ID</strong></td><td id="confrm_orderid"></td></tr>';
                        review_html += '<tr><td><strong>Shipping</strong></td><td>' + reviews['shipping_method'] + '</td></tr>';
                        review_html += '<tr><td><strong>Payment</strong></td><td>' + reviews['payment_method'] + '</td></tr>';
                        review_html += '<tr><td><strong>Delivery Time</strong></td><td>' + reviews['delivery_time'] + '</td></tr>';
                        review_html += '<tr><td><strong>Email</strong></td><td>' + reviews['email'] + '</td></tr>';
                        review_html += '<tr><td><strong>Contact No</strong></td><td>' + reviews['telephone'] + '</td></tr>';
                        review_html += '<tr><td><strong>Name </strong></td><td>' + reviews['shipping_firstname'] + ' ' + reviews['shipping_lastname'] + '</td></tr>';
                        review_html += '<tr><td rowspan="2"><strong>Address</strong></td><td >' + reviews['shipping_address_1'] + '</td></tr>';
                        review_html += '<tr><td>' + reviews['shipping_postcode'] + '</td></tr>';
                        if (reviews['totals']) {
                            for (i in reviews['totals']) {
                                review_html += '<tr><td><strong>' + reviews['totals'][i].title + ':</strong></td><td>' + reviews['totals'][i].text + '</td></tr>';
                            }
                        }
                        review_html += '</tbody></table>';
                        $('#review_data').html(review_html);
                        $('#payment_proccess_msg').html('');
                        $('#payment_continue').html('');
                        $.mobile.loading("hide");
                        $.mobile.changePage("#pagePayment");
                        show_loading_icon();
                        etmRestaurant.payment_success = 0;
                        sessionStorage.setItem("payment_method", reviews['payment_method']);
                        etmRestaurant.ref = window.open(etmRestaurant.url + 'orderpaymenturl&order_id=' + sessionStorage.order_id, '_blank', 'location=no,hidden=yes');
                        etmRestaurant.ref.addEventListener('loadstart', function(event) {
                            if ($.mobile.path.parseUrl(etmRestaurant.url).hostname == $.mobile.path.parseUrl(event.url).hostname) {
                                if (event.url.split('/').pop() == 'checkoutetm' || event.url.split('/').pop() == 'checkout') {
                                    etmRestaurant.payment_success = 2;
                                    $('#payment_processes').html('');
                                    $('#payment_continue').html('<a href="#" class="ui-btn ui-btn-inline ui-mini btn_payment_error">Continue</a>');
                                    $('#payment_proccess_msg').html('<h3 class="error">' + sessionStorage.payment_method + '&nbsp;&nbsp;Payment cancelled.Continue with other Payment.</h3');
                                    $.mobile.loading("hide");
                                    etmRestaurant.ref.close();
                                }
                                else if (event.url.split('/').pop() == 'success') {
                                    etmRestaurant.payment_success = 1;
                                }
                            }
                        });
                        etmRestaurant.ref.addEventListener('loadstop', function(event) {
                            if ($.mobile.path.parseUrl(etmRestaurant.url).hostname != $.mobile.path.parseUrl(event.url).hostname) {
                                etmRestaurant.ref.show();
                            }
                            if (etmRestaurant.payment_success == 2) {
                                $.mobile.loading("hide");
                                etmRestaurant.ref.close();
                            }
                            if (etmRestaurant.payment_success == 1) {
                                confirmorder();
                                etmRestaurant.ref.close();
                            }
                        });
                        etmRestaurant.ref.addEventListener('loaderror', function(event) {
                            $('#payment_processes').html('');
                            $('#payment_continue').html('<a href="#" class="ui-btn ui-btn-inline ui-mini btn_payment_error" >Continue</a>');
                            $('#payment_proccess_msg').html('<h3 class="error">' + sessionStorage.payment_method + '&nbsp;&nbsp;Loading Error.</h3');
                            $.mobile.loading("hide");
                            etmRestaurant.ref.close();
                        });
                        etmRestaurant.ref.addEventListener('exit', function(event) {
                            if (etmRestaurant.payment_success == 0) {
                                $('#payment_processes').html('');
                                $('#payment_continue').html('<a href="#" class="ui-btn ui-btn-inline ui-mini btn_payment_error" >Continue</a>');
                                $.mobile.loading("hide");
                            }
                        });
                    }
                }
                catch (e) {
                    etmRestaurant.error_continue_page = revieworder;
                    catch_errors(e, "Error - 111");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = revieworder;
                        connection_errors("Error -  C 111");
                    });
        }
        else {
            etmRestaurant.error_continue_page = revieworder;
            connection_errors("Error -  C1 111");
        }
    }
    catch (e) {
        etmRestaurant.error_continue_page = revieworder;
        catch_errors(e, "Error - 111A");
    }
}
function confirmorder() {
    show_loading_icon();
    if (localStorage.customer_id) {
        data = {order_id: sessionStorage.order_id};
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'confirmorder',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    html = '';
                    confirm_response = JSON.parse(response.data);
                    if (confirm_response['order_id']) {
                        localStorage.setItem("confirmed_order_" + localStorage.customer_id, confirm_response['order_id']);
                        etmRestaurant.item_count = 0;
                        $('.btn_checkout').html('');
                        orderStatus();
                        etmRestaurant.temp_itemcount = 0;
                        etmRestaurant.cart.length = 0;
                        etmRestaurant.added_items.length = 0;
                        if (sessionStorage.validcoupon) {
                            sessionStorage.removeItem("validcoupon");
                        }
                        if (sessionStorage.reward) {
                            sessionStorage.removeItem("validreward");
                        }
                        if (sessionStorage.voucher) {
                            sessionStorage.removeItem("validvoucher");
                        }
                        $('#order_success_msg').html('Order Placed Successfully !! ');
                        $('#confrm_orderid').html('#' + confirm_response['order_id']);
                        $.mobile.loading("hide");
                        $.mobile.changePage('#pageConfirm');
                        $('#tab_review').table().trigger('create');
                    }
                }
                catch (e) {
                    etmRestaurant.error_continue_page = revieworder;
                    catch_errors(e, "Error - 112");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = revieworder;
                        connection_errors("Error -  C 112");
                    });
        }
        else {
            etmRestaurant.error_continue_page = revieworder;
            connection_errors("Error -  C1 112");
        }
    }
    else {
        $.mobile.loading("hide");
        $.mobile.changePage('#pageLogin');
    }
}
function myAccount() {
    getCustomerAddresses(function(address) {
    });
    getcustomerdetails(function(acc_info) {
    });
}
function settings() {
    html1 = '';
    if (localStorage.customer_id) {
        if (JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id)) != "undefined") {
            cust_details = JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id));
        }
        else {
            getcustomerdetails(function(cust_details) {
            });
        }
        html1 += '<div id="rem_acc_name">';
        html1 += '<p>' + cust_details['firstname'] + ' ' + cust_details['lastname'] + '</p>';
        html1 += '<p>' + cust_details['email'] + '</p>';
        html1 += '<p>' + cust_details['telephone'] + '</p>';
        html1 += '<a href="#popupRemoveAccount" class="ui-btn ui-icon-delete ui-btn-icon-right ui-shadow-icon" id="btn_rem_acc" data-rel="popup">Remove Account From App</a>';
        html1 += '<a href="#" class="ui-btn ui-btn-a " id="btn_logout">Logout</a></div>';
        $('#acc_info').html(html1);
        $('#txt_username').val(cust_details['email']);
        $.mobile.changePage('#pageSettings');
    }
    else {
        sessionStorage.setItem("from_settings", "yes");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_editaddress");
        $.mobile.changePage('#pageLogin');
    }
}
function getCustomerAddresses(callback) {
    data = {customer_id: localStorage.customer_id};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getcustomeraddresses',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                localStorage.setItem("customer_addresses_" + localStorage.customer_id, response.data);
                callback(response.data);
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageHome';
                catch_errors(e, "Error - 113");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error -  C 113");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageHome';
        connection_errors("Error -  C1 113");
    }
}
function addressList() {
    html = '';
    if (localStorage.getItem("customer_addresses_" + localStorage.customer_id) !== "undefined") {
        customer_address = JSON.parse(localStorage.getItem("customer_addresses_" + localStorage.customer_id));
    }
    else {
        getCustomerAddresses(function(address) {
            customer_address = JSON.parse(address);
        });
    }
    for (i in customer_address) {
        html += '<li><p>' + customer_address[i].firstname + ' ' + customer_address[i].lastname + '</p>';
        html += '<p>' + customer_address[i].address_1 + '</p>';
        html += '<p>' + customer_address[i].postcode + '</p>';
        html += '<p><a href="#" class="ui-btn ui-btn-b ui-btn-inline ui-mini btn_edit_address" addr_id="' + customer_address[i].address_id + '">Edit</a></p></li>';
    }
    html += '<div><a href="#" class="ui-btn ui-btn-c ui-btn-inline ui-mini" id="btn_addaddress">New Address</a></div>';
    $('.cust_address_list ul').html(html);
    $('.cust_address_list ul').listview('refresh');

}
function dialogAddressList() {
    html = '';
    if (localStorage.getItem("customer_addresses_" + localStorage.customer_id) !== "undefined") {
        customer_address = JSON.parse(localStorage.getItem("customer_addresses_" + localStorage.customer_id));
        for (i in customer_address) {
            html += '<li class="delivery_address" deliver_addr="' + customer_address[i].address_id + '" ><p>' + customer_address[i].firstname + ' ' + customer_address[i].lastname + '</p>';
            html += '<p>' + customer_address[i].address_1 + '</p>';
            html += '<p>' + customer_address[i].postcode + '</p></li>';
        }
        html += '<div><a href="#" class="ui-btn ui-btn-b ui-corner-all ui-btn-inline ui-mini" id="btn_ship_addaddress">New Address</a></div>';
        $('.cust_address_lists ul').html(html);
        $('.cust_address_lists ul').listview('refresh');
    }
}
function change_ship_address() {
    sessionStorage.setItem("change_ship_address", "yes");
    sessionStorage.setItem("checked_payment_method", $('input:radio[name="payment_method"]:checked').val());
    sessionStorage.setItem("checked_shipping_method", $('input:radio[name="shipping_method"]:checked').val());
    if ($(this).attr('deliver_addr')) {
        sessionStorage.setItem("default_address_id", $(this).attr('deliver_addr'));
    }
    cartdetails();
}
function getcustomerdetails(callback) {
    data = {customer_id: localStorage.customer_id};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getcustomerdetails',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                customer_details = JSON.parse(response.data);
                localStorage.setItem("customerdetails_" + localStorage.customer_id, response.data);
                sessionStorage.setItem("cust_fname", customer_details['firstname']);
                sessionStorage.setItem("cust_lname", customer_details['lastname']);
                sessionStorage.setItem("cust_email", customer_details['email']);
                sessionStorage.setItem("cust_telephone", customer_details['telephone']);
                sessionStorage.setItem("cust_address_id", customer_details['address_id']);
                callback(customer_details);
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageHome';
                catch_errors(e, "Error - 114");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error -  C 114");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageHome';
        connection_errors("Error -  C1 114");
    }
}
function click_btn_offers() {
    $.mobile.changePage('#pageOffers');
}
function click_btn_history() {
    if (localStorage.customer_id) {
        $.mobile.changePage('#pageHistory');
    }
    else {
        sessionStorage.setItem("from_orderhistory", "yes");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_editaddress");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_settings");
        $.mobile.changePage('#pageLogin');
    }
}
function click_btn_reward() {
    if (localStorage.customer_id) {
        $.mobile.changePage('#pageRewards');
    }
    else {
        sessionStorage.setItem("from_reward", "yes");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_editaddress");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_settings");
        $.mobile.changePage('#pageLogin');
    }
}
function click_btn_edit() {
    $('#edit_msg').html('');
    if (localStorage.customer_id) {
        $.mobile.changePage('#pageEdit');
    }
    else {
        sessionStorage.setItem("from_edit", "yes");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_editaddress");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_settings");
        $.mobile.changePage('#pageLogin');
    }
}
function click_btn_change_password() {
    $('#pswd_mismatch').html('');
    $('#pswd').val('');
    $('#confirm_pswd').val('');
    if (localStorage.customer_id) {
        $.mobile.changePage('#pageChangePassword');
    }
    else {
        sessionStorage.setItem("from_changepasswaord", "yes");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_editaddress");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_settings");
        $.mobile.changePage('#pageLogin');
    }
}
function click_btn_edit_address() {
    if (localStorage.customer_id) {
        $.mobile.changePage('#pageAddress');
    }
    else {
        sessionStorage.setItem("from_editaddress", "yes");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_orderstat");
        sessionStorage.removeItem("from_settings");
        $.mobile.changePage('#pageLogin');
    }
}
function editAccount() {
    $('#edit_msg').html('');
    if (localStorage.customer_id) {
        $('#fname').val('');
        $('#lname').val('');
        $('#email').val('');
        $('#telephone').val('');
        if (JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id)) != "undefined") {
            cust_details = JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id));
        }
        else {
            getcustomerdetails(function(cust_details) {
            });
        }
        $('#fname').val(cust_details['firstname']);
        $('#lname').val(cust_details['lastname']);
        $('#email').val(cust_details['email']);
        $('#telephone').val(cust_details['telephone']);
    }
    else {
        $.mobile.changePage('#pageLogin');
    }
}
function changecustomerdetails() {
    try {
        edit_error = 0;
        $('label').removeClass('error');
        $('#edit_msg').html('');
        $('#edit_invalid_email').html('');
        $('#edit_invalid_phone').html('');
        if ($('#email').val() == "") {
            $('[for=email]').addClass('error');
            edit_error = 1;
        }
        if ($('#telephone').val() == "") {
            $('[for=telephone]').addClass('error');
            edit_error = 1;
        }
        if ($('#fname').val() == "") {
            $('[for=fname]').addClass('error');
            edit_error = 1;
        }
        if ($('#lname').val() == "") {
            $('[for=lname]').addClass('error');
            edit_error = 1;
        }
        if ($('#email').val() != "") {
            atpos = $('#email').val().indexOf("@");
            dotpos = $('#email').val().lastIndexOf(".");
            if (atpos < 1 || dotpos - atpos < 2) {
                $('#edit_invalid_email').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Email Address</span>');
                edit_error = 1;
            }
        }
        if ($('#telephone').val() != "" && (checkUKTelephone($('#telephone').val()) == false)) {
            $('#edit_invalid_phone').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Phone Number</span>');
            edit_error = 1;
        }
        if (edit_error == 1) {
            return 0;
        }
        else {
            if (JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id)) != "undefined") {
                cust_details = JSON.parse(localStorage.getItem("customerdetails_" + localStorage.customer_id));
                data = {customer_id: localStorage.customer_id, address_id: cust_details['address_id'], firstname: $('#fname').val(), lastname: $('#lname').val(), telephone: $('#telephone').val(), email: $('#email').val()};
            }
            if (isOnlineConnection()) {
                window.cordovaHTTP.post(etmRestaurant.url + 'changecustomerdetails',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        getcustomerdetails(function(acc_info) {
                            $('#edit_msg').html('<h3 class="success_msg">Successfully Updated</h3>');
                        });
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = '#pageEdit';
                        catch_errors(e, "Error - 115");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = '#pageEdit';
                            connection_errors("Error -  C 115");
                        });
            }
            else {
                etmRestaurant.error_continue_page = '#pageEdit';
                connection_errors("Error -  C1 115");
            }
        }
    }
    catch (e) {
        etmRestaurant.error_continue_page = '#pageEdit';
        catch_errors(e, "Error - 115A");
    }
}
function addressToEdit() {
    if (localStorage.customer_id) {
        sessionStorage.setItem("edit_address_id", $(this).attr('addr_id'));
        customer_address = JSON.parse(localStorage.getItem("customer_addresses_" + localStorage.customer_id));
        for (i in customer_address) {
            if (i == $(this).attr('addr_id')) {
                $('#editfname').val(customer_address[i].firstname);
                $('#editlname').val(customer_address[i].lastname);
                $('#editaddress1').val(customer_address[i].address_1);
                $('#editpostcode').val(customer_address[i].postcode);
            }
        }
        $.mobile.changePage('#pageEditAddress');
    }
    else {
        $.mobile.changePage('#pageLogin');
    }
}
function changeaddress() {
    try {
        $('label').removeClass('error');
        $('#addr_invalid_post').html('');
        address_error = 0;
        if ($('#editfname').val() == "") {
            $('[for=editfname]').addClass('error');
            address_error = 1;
        }
        if ($('#editlname').val() == "") {
            $('[for=editlname]').addClass('error');
            address_error = 1;
        }
        if ($('#editaddress1').val() == "") {
            $('[for=editaddress1]').addClass('error');
            address_error = 1;
        }
        if ($('#editpostcode').val() == "") {
            $('[for=editpostcode]').addClass('error');
            address_error = 1;
        }
        if ($('#editpostcode').val() != "") {
            postcode = $('#editpostcode').val();
            pcode = postcode_formater(postcode);
            $('#editpostcode').val(pcode);
            validpcode = postcode_check(pcode);
            if (validpcode == false) {
                $('#addr_invalid_post').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Post Code</span>');
                address_error = 1;
            }
        }
        if (address_error == 1) {
            return 0;
        }
        else {
            data = {customer_id: localStorage.customer_id, address_id: sessionStorage.edit_address_id, firstname: $('#editfname').val(), lastname: $('#editlname').val(), address: $('#editaddress1').val(), postcode: $('#editpostcode').val()};
            if (isOnlineConnection()) {
                window.cordovaHTTP.post(etmRestaurant.url + 'changeaddress',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        getCustomerAddresses(function(address) {
                            $.mobile.changePage('#pageAddress');
                        });
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = changeaddress;
                        catch_errors(e, "Error - 116");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = changeaddress;
                            connection_errors("Error -  C 116");
                        });
            }
            else {
                etmRestaurant.error_continue_page = changeaddress;
                connection_errors("Error -  C1 116");
            }
        }
    }
    catch (e) {
        etmRestaurant.error_continue_page = changeaddress;
        catch_errors(e, "Error - 116A");
    }
}
function addAddress() {
    try {
        $('label').removeClass('error');
        $('#addaddr_invalid_post').html('');
        $('#addaddr_invalid_phone').html('');
        address_error = 0;
        if ($('#newfname').val() == "") {
            $('[for=newfname]').addClass('error');
            address_error = 1;
        }
        if ($('#newlname').val() == "") {
            $('[for=newlname]').addClass('error');
            address_error = 1;
        }
        if ($('#newaddress1').val() == "") {
            $('[for=newaddress1]').addClass('error');
            address_error = 1;
        }
        if ($('#newtelephone').val() == "") {
            $('[for=newtelephone]').addClass('error');
            address_error = 1;
        }
        if ($('#newpostcode').val() == "") {
            $('[for=newpostcode]').addClass('error');
            address_error = 1;
        }
        if ($('#newpostcode').val() != "") {
            postcode = $('#newpostcode').val();
            pcode = postcode_formater(postcode);
            $('#newpostcode').val(pcode);
            validpcode = postcode_check(pcode);
            if (validpcode == false) {
                $('#addaddr_invalid_post').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Post Code</span>');
                address_error = 1;
            }
        }
        if ($('#newtelephone').val() != "" && (checkUKTelephone($('#newtelephone').val()) == false)) {
            $('#addaddr_invalid_phone').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Phone Number</span>');
            address_error = 1;
        }
        if (address_error == 1) {
            return 0;
        }
        else {
            data = {customer_id: localStorage.customer_id, firstname: $('#newfname').val(), lastname: $('#newlname').val(), address: $('#newaddress1').val(), telephone: $('#newtelephone').val(), postcode: $('#newpostcode').val()};
            if (isOnlineConnection()) {
                window.cordovaHTTP.post(etmRestaurant.url + 'addadress',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        new_address = JSON.parse(response.data);
                        if (new_address['success']) {
                            if (sessionStorage.from_ship_page) {
                                sessionStorage.setItem("default_address_id", new_address.success.address_id);
                                sessionStorage.removeItem("from_ship_page");
                                sessionStorage.setItem("change_ship_address", "yes");
                                getCustomerAddresses(function(address) {
                                    cartdetails();
                                });
                            }
                            else {
                                getCustomerAddresses(function(address) {
                                    $.mobile.changePage('#pageAddress');
                                });
                            }
                        }
                        else {
                            $('.error_postcode').html('<span class="error" >' + new_address['error'] + '</span>');
                        }
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = addAddress;
                        catch_errors(e, "Error - 117");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = addAddress;
                            connection_errors("Error -  C 117");
                        });
            }
            else {
                etmRestaurant.error_continue_page = addAddress;
                connection_errors("Error -  C1 117");
            }
        }
    }
    catch (e) {
        etmRestaurant.error_continue_page = addAddress;
        catch_errors(e, "Error - 117A");
    }
}
function getOffers(callback) {
    show_loading_icon();
    data = {};
    sessionStorage.setItem("offer_checked", "checked");
    if (localStorage.customer_id) {
        data = {customer_id: localStorage.customer_id};
    }
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getOffers',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                html_offers = '';
                json = JSON.parse(response.data);
                if (json != "") {
                    $(".navbar_one").hide();
                    $(".navbar_second").show();
                    for (i in json) {
                        html_offers += '<div class="offerslist">' + json[i] + '</div>';
                    }
                    $('#offers_container').html(html_offers);
                }
                else {
                    $(".navbar_second").hide();
                    $(".navbar_one").show();
                }
                $.mobile.loading('hide');
                callback(json);
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageHome';
                catch_errors(e, "Error - 118");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageHome';
                    connection_errors("Error -  C 118");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageHome';
        connection_errors("Error -  C1 118");
    }
}
function forgottenPassword() {
    $('#forgot_pswd_err').html('');
    $('#login_error').html('');
    if ($('#txt_email_send').val() == "") {
        $('#forgot_pswd_err').html('<span class="error">Enter Email ID</span>');
        return 0;
    }
    else {
        atpos = $('#txt_email_send').val().indexOf("@");
        dotpos = $('#txt_email_send').val().lastIndexOf(".");
        if (atpos < 1 || dotpos - atpos < 2) {
            $('#forgot_pswd_err').html('<span class="error" >&nbsp;&nbsp;&nbsp;Invalid Email Address</span>');
            return 0;
        }
    }
    if (isOnlineConnection()) {
        data = {email: $('#txt_email_send').val()};
        window.cordovaHTTP.post(etmRestaurant.url + 'forgottenPassword',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                json = JSON.parse(response.data);
                if (json['error_warning'] == "") {
                    sessionStorage.setItem("sent_newpassord", "A new password has been sent to your e-mail address.");
                    $.mobile.changePage('#pageLogin');
                }
                else {
                    $('#forgot_pswd_err').html('<span class="error">The E-Mail Address was not found in our records, please try again!</span>');
                }
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageForgottenPassword';
                catch_errors(e, "Error - 119");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageForgottenPassword';
                    connection_errors("Error -  C 119");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageForgottenPassword';
        connection_errors("Error -  C1 119");
    }
}
function changePassword() {
    if (localStorage.customer_id) {
        if ($('#pswd').val() == "" || $('#confirm_pswd').val() == "") {
            $('#pswd_mismatch').html('<span class="error">Enter Password and Confirm Password</span>');
            return 0;
        }
        else if ($('#pswd').val() != $('#confirm_pswd').val()) {
            $('#pswd_mismatch').html('<span class="error">Password Mismatch</span>');
            return 0;
        }
        data = {customer_id: localStorage.customer_id, password: $('#confirm_pswd').val()};
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'changepassword',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    $('#pswd_mismatch').html('<span class="success_msg">Password Changed</span>');
                }
                catch (e) {
                    etmRestaurant.error_continue_page = '#pageChangePassword';
                    catch_errors(e, "Error - 120");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = '#pageChangePassword';
                        connection_errors("Error -  C 120");
                    });
        }
        else {
            etmRestaurant.error_continue_page = '#pageChangePassword';
            connection_errors("Error -  C1 120");
        }
    }
    else {
        $.mobile.changePage('#pageLogin');
    }
}
function orderHistory() {
    html = '';
    flag_serverhistory = 1;
    if (localStorage.customer_id) {
        $('#rewardpoints').html('');
        newtime = new Date();
        if (localStorage.orderhistory_time) {
            date_diff = Date.parse(newtime) - Date.parse(localStorage.orderhistory_time);
            if (date_diff >= 900000) {
                localStorage.setItem("orderhistory_time", newtime);
                flag_serverhistory = 1;
            }
            else {
                flag_serverhistory = 0;
            }
        }
        else {
            flag_serverhistory = 1;
            localStorage.setItem("orderhistory_time", newtime);
        }
        if (flag_serverhistory == 0) {
            if (localStorage.getItem("customerorders_" + localStorage.customer_id)) {
                orders = JSON.parse(localStorage.getItem("customerorders_" + localStorage.customer_id));
                if (orders['rewards']) {
                    for (i in  orders['rewards']) {
                        $('#rewardpoints').append('<p>Your  Reward Points : ' + orders['rewards'][i].points + '</p>');
                    }
                }
                if (orders['total_reward']) {
                    $('#rewardpoints').append('<p>Your Total Reward Points : ' + orders['total_reward'] + '</p>');
                }
                if (orders['orders']) {
                    for (i in orders['orders']) {
                        html += '<li data-role="list-divider">Order ID: #' + orders['orders'][i].order_id + '<span class="prd_details">Status:' + orders['orders'][i].status + '</span></li>';
                        html += '<li><p><strong>Date Added:</strong>' + orders['orders'][i].date_added + '</p>';
                        html += '<p><span><strong>Total:</strong>' + orders['orders'][i].total + '</span>';
                        html += '<span class="prd_details"><strong>Products:</strong>' + orders['orders'][i].products + '</span></p>';
                        html += '<p><strong>Products:</strong>' + orders['orders'][i].productsname + '</p>';
                        html += '<p><a href="#" class="ui-btn ui-btn-b ui-btn-inline ui-mini btn_view" orderid="' + orders['orders'][i].order_id + '" ord_stat="' + orders['orders'][i].status + '" >View</a>';
                        html += '<button class="ui-btn ui-btn-c ui-btn-inline ui-mini btn_reorder" orderid="' + orders['orders'][i].order_id + '" >Reorder</button></p>';
                        html += '</li>';
                    }
                    $('#div_orderhistory ul').html(html);
                    $('#div_orderhistory ul').listview('refresh');
                }
                else {
                    html += '<li>No Orders</li>';
                    $('#div_orderhistory ul').html(html);
                    $('#div_orderhistory ul').listview('refresh');
                }
                return 0;
            }
        }
        data = {customer_id: localStorage.customer_id};
        if (isOnlineConnection()) {
            window.cordovaHTTP.post(etmRestaurant.url + 'getcustomerorders',
                    data, {Authorization: "OAuth2: token"},
            function(response) {
                try {
                    localStorage.setItem("customerorders_" + localStorage.customer_id, response.data);
                    orders = JSON.parse(response.data);
                    if (orders['rewards']) {
                        for (i in  orders['rewards']) {
                            $('#rewardpoints').append('<p>Your  Reward Points : ' + orders['rewards'][i].points + '</p>');
                        }
                    }
                    if (orders['total_reward']) {
                        $('#rewardpoints').append('<p>Your Total Reward Points : ' + orders['total_reward'] + '</p>');
                    }
                    if (orders['orders']) {
                        for (i in orders['orders']) {
                            html += '<li data-role="list-divider">Order ID: #' + orders['orders'][i].order_id + '<span class="prd_details">Status:' + orders['orders'][i].status + '</span></li>';
                            html += '<li><p><strong>Date Added:</strong>' + orders['orders'][i].date_added + '</p>';
                            html += '<p><span><strong>Total:</strong>' + orders['orders'][i].total + '</span>';
                            html += '<span class="prd_details"><strong>Products:</strong>' + orders['orders'][i].products + '</span></p>';
                            html += '<p><strong>Products:</strong>' + orders['orders'][i].productsname + '</p>';
                            html += '<p><a href="#" class="ui-btn ui-btn-b ui-btn-inline ui-mini btn_view" orderid="' + orders['orders'][i].order_id + '" >View</a>';
                            html += '<button class="ui-btn ui-btn-c ui-btn-inline ui-mini btn_reorder" orderid="' + orders['orders'][i].order_id + '" >Reorder</button></p>';
                            html += '</li>';
                        }
                        $('#div_orderhistory ul').html(html);
                        $('#div_orderhistory ul').listview('refresh');
                    }
                    else {
                        html += '<li>No Orders</li>';
                        $('#div_orderhistory ul').html(html);
                        $('#div_orderhistory ul').listview('refresh');
                    }
                }
                catch (e) {
                    etmRestaurant.error_continue_page = '#pageHistory';
                    catch_errors(e, "Error - 121");
                }
            },
                    function(error) {
                        etmRestaurant.error_continue_page = '#pageHistory';
                        connection_errors("Error -  C 121");
                    });
        }
        else {
            etmRestaurant.error_continue_page = '#pageHistory';
            connection_errors("Error -  C1 121");
        }
    }
    else {
        $.mobile.changePage('#pageLogin');
    }
}
function refreshorderHistory() {
    $('#div_orderhistory ul').listview('refresh');
}
function orderstats() {
    sessionStorage.setItem("orderstats", "yes");
    orderStatus();
}
function orderStatus() {
    status_html = '';
    if (localStorage.customer_id) {
        if (isOnlineConnection()) {
            if (localStorage.getItem("confirmed_order_" + localStorage.customer_id)) {
                data = {order_id: localStorage.getItem("confirmed_order_" + localStorage.customer_id)};
                window.cordovaHTTP.post(etmRestaurant.url + 'getorderstatuses',
                        data, {Authorization: "OAuth2: token"},
                function(response) {
                    try {
                        order_stat = JSON.parse(response.data);
                        if (order_stat['order_statuses']) {
                            status_html += '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke place_orderstatus"><tbody>';
                            status_html += '<tr class="status_heading"><th colspan="2">Order ID : #' + localStorage.getItem("confirmed_order_" + localStorage.customer_id) + '</th><tr>';
                            status_html += '<tr class="status_heading"><th>Time</th><th>Status</th></tr>';
                            for (i in order_stat['order_statuses']) {
                                status_html += '<tr><td><strong>' + order_stat['order_statuses'][i].date_added + '</strong></td><td><strong>' + order_stat['order_statuses'][i].status + '</strong></td></tr>';
                                if (order_stat['order_statuses'][i].status == 'Complete') {
                                    $(".orderstat").html('');
                                }
                                else {
                                    $(".orderstat").html('*');
                                }
                            }
                            if (order_stat['order_statuses'][i].comment) {
                                cmt = order_stat['order_statuses'][i].comment;
                                cmt = cmt.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
                                status_html += '<tr><td colspan="2">' + cmt + '</td></tr>';
                            }
                            status_html += '</tbody ></table>';
                            $('#orderstatus').html(status_html);
                            $('#orderstatus').trigger('create');
                            $('#orderstatus').attr('orderid', localStorage.getItem("confirmed_order_" + localStorage.customer_id));
                            $('#orderstatus').attr('ord_stat', order_stat['order_statuses'][i].status);
                        }
                        else {
                            status_html += '<label>No Orders</label>';
                            $('#orderstatus').html(status_html);
                        }
                    }
                    catch (e) {
                        etmRestaurant.error_continue_page = '#pageHome';
                        catch_errors(e, "Error - 122");
                    }
                },
                        function(error) {
                            etmRestaurant.error_continue_page = '#pageHome';
                            connection_errors("Error -  C 122");
                        });

            }
            else {
                $('#orderstatus').html("No Recent Orders");
            }
            if (sessionStorage.orderstats) {
                sessionStorage.removeItem("orderstats");
                $.mobile.changePage("#pageOrderStatus");
            }
        }
        else {
            etmRestaurant.error_continue_page = '#pageHome';
            connection_errors("Error -  C1 122");
        }
    }
    else {
        sessionStorage.setItem("from_orderstat", "yes");
        sessionStorage.removeItem("from_settings");
        sessionStorage.removeItem("from_orderhistory");
        sessionStorage.removeItem("from_reward");
        sessionStorage.removeItem("from_edit");
        sessionStorage.removeItem("from_changepasswaord");
        sessionStorage.removeItem("from_editaddress");
        $.mobile.changePage('#pageLogin');
    }
}
function getorder() {
    $('#viewOrders').html('');
    html = '';
    sessionStorage.removeItem("status");
    orderid = $(this).attr('orderid');
    data = {order_id: $(this).attr('orderid')};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getorderstatuses',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                order_stat = JSON.parse(response.data);
                if (order_stat['order_statuses']) {
                    for (i in order_stat['order_statuses']) {
                        sessionStorage.setItem("status", order_stat['order_statuses'][i].status);
                    }
                }
                $('#viewOrders').html('');
                html = '';
                data = {order_id: orderid, customer_id: localStorage.customer_id};
                if (isOnlineConnection()) {
                    window.cordovaHTTP.post(etmRestaurant.url + 'getorder',
                            data, {Authorization: "OAuth2: token"},
                    function(response) {
                        try {
                            json = JSON.parse(response.data);
                            html += '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke" class="tab_contacts_info"><tbody>';
                            html += '<tr ><td><strong>Order ID :</strong></td><td>#' + json['order_id'] + '</td></tr>';
                            html += '<tr ><td><strong>Status : </strong></td><td>' + sessionStorage.status + '</td></tr>';
                            html += '<tr ><td><strong>Date Added : </strong></td><td>' + json['date_added'] + '</td></tr>';
                            html += '<tr ><td><strong>Shipping : </strong></td><td>' + json['shipping_method'] + '</td></tr>';
                            html += '<tr ><td><strong>Payment: </strong></td><td>' + json['payment_method'] + '</td></tr>';
                            html += '<tr ><td rowspan="6" valign="top"><strong >Delivery Address: </strong></td><td>' + json['shipping_firstname'] + ' ' + json['shipping_firstname'] + '</td></tr>';
                            if (json['shipping_address_1']) {
                                html += '<tr ><td>' + json['shipping_address_1'] + '</td></tr>';
                            }
                            if (json['shipping_address_2']) {
                                html += '<tr ><td>' + json['shipping_address_2'] + '</td></tr>';
                            }
                            if (json['shipping_postcode']) {
                                html += '<tr ><td>' + json['shipping_postcode'] + '</td></tr>';
                            }
                            if (json['shipping_zone']) {
                                html += '<tr ><td>' + json['shipping_zone'] + '</td></tr>';
                            }
                            if (json['shipping_country']) {
                                html += '<tr ><td>' + json['shipping_country'] + '</td></tr>';
                            }
                            html += '</tbody></table>';
                            html += '<p><strong>Cart</strong></p>';
                            $('#viewOrders').html(html);
                            if (json['products']) {
                                for (i in json['products']) {
                                    $('#viewOrders').append('<div class="div_prod_details"><div class="ui-block-a prd_namess" >' + json['products'][i].name + '</div>');
                                    $('#viewOrders').append('<div class="ui-block-b prd_namess" >' + json['products'][i].quantity + '</div>');
                                    $('#viewOrders').append('<div class="ui-block-c prd_namess" >' + json['products'][i].price + '</div><br />');
                                    if (json['products'][i].bundle) {
                                        for (j in json['products'][i].bundle) {
                                            $('#viewOrders').append('<div class="bundle_products_name">' + json['products'][i].bundle[j].name + '</div>');
                                            if (json['products'][i].bundle[j].options) {
                                                for (k in json['products'][i].bundle[j].options) {
                                                    $('#viewOrders').append('<div class="bundle_products_options">--' + json['products'][i].bundle[j].options[k].name + ':' + json['products'][i].bundle[j].options[k].value + '</div>');
                                                }
                                            }
                                        }
                                    }
                                    if (json['products'][i].option) {
                                        for (j in json['products'][i].option) {
                                            $('#viewOrders').append('<div class="products_option_name">-' + json['products'][i].option[j].name + ':' + json['products'][i].option[j].value + '</div>');
                                        }
                                    }
                                    $('#viewOrders').append('</div>');
                                }
                                if (json['totals']) {
                                    $('#viewOrders').append('<br/>');
                                    for (i in json['totals']) {
                                        $('#viewOrders').append('<div class="ui-block-a "></div>');
                                        $('#viewOrders').append('<div class="ui-block-b tot_price">' + json['totals'][i].title + ':</div>');
                                        $('#viewOrders').append('<div class="ui-block-c tot_price">' + json['totals'][i].text + '</div>');
                                    }
                                }
                            }
                            else {
                                $('#viewOrders').append('<div>No Cart to Show</div>');
                            }
                            $.mobile.changePage('#pageViewOrders');
                        }
                        catch (e) {
                            etmRestaurant.error_continue_page = getorder;
                            catch_errors(e, "Error - 123");
                        }
                    },
                            function(error) {
                                etmRestaurant.error_continue_page = getorder;
                                connection_errors("Error -  C 123");
                            });
                }
                else {
                    etmRestaurant.error_continue_page = getorder;
                    connection_errors("Error -  C1 123");
                }
            }
            catch (e) {
                etmRestaurant.error_continue_page = getorder;
                catch_errors(e, "Error - 123A");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = getorder;
                    connection_errors("Error -  C 123");
                });
    }
    else {
        etmRestaurant.error_continue_page = getorder;
        connection_errors("Error -  C1 123");
    }
}
function reorder() {
    data = {customer_id: localStorage.customer_id, address_id: sessionStorage.default_address_id, orderid: $(this).attr('orderid')};
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'reorder',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                json = JSON.parse(response.data);
                displayCartdetails(json);
            }
            catch (e) {
                console.log(e);
                $('#cosole_errors').html('Error - 128');
                $.mobile.changePage('#pageError');
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = reorder;
                    connection_errors("Error -  C 124");
                });
    }
    else {
        etmRestaurant.error_continue_page = reorder;
        connection_errors("Error -  C1 124");
    }
}
function logout() {
    $('#pwd_password').val('');
    localStorage.removeItem("customer_id");
    $(".orderstat").html('');
    sessionStorage.removeItem("from_settings");
    etmRestaurant.item_count = 0;
    $('.btn_checkout').html('');
    etmRestaurant.temp_itemcount = 0;
    etmRestaurant.cart.length = 0;
    etmRestaurant.added_items.length = 0;
    $.mobile.changePage('#pageHome');
}
function removeAccount() {
    localStorage.removeItem('customer_addresses_' + localStorage.customer_id);
    localStorage.removeItem('customerorders_' + localStorage.customer_id);
    localStorage.removeItem("confirmed_order_" + localStorage.customer_id)
    localStorage.removeItem('customer_id');
    $(".orderstat").html('');
    etmRestaurant.item_count = 0;
    $('.btn_checkout').html('');
    etmRestaurant.temp_itemcount = 0;
    etmRestaurant.cart.length = 0;
    etmRestaurant.added_items.length = 0;
    $.mobile.changePage('#pageHome');
}
function getstoreinfo() {
    show_loading_icon();
    if (isOnlineConnection()) {
        window.cordovaHTTP.post(etmRestaurant.url + 'getstoreinfo',
                data, {Authorization: "OAuth2: token"},
        function(response) {
            try {
                contact = '';
                opening_hours = '';
                localStorage.setItem("storeinfo", response.data);
                localStorage.setItem("storeinfotime", new Date());
                $.mobile.loading('hide');
                checkLocalStorage();
            }
            catch (e) {
                etmRestaurant.error_continue_page = '#pageLoading';
                clearInterval(etmRestaurant.localloding_IntervalID);
                catch_errors(e, "Error - 125");
            }
        },
                function(error) {
                    etmRestaurant.error_continue_page = '#pageLoading';
                    clearInterval(etmRestaurant.localloding_IntervalID);
                    connection_errors("Error -  C 125");
                });
    }
    else {
        etmRestaurant.error_continue_page = '#pageLoading';
        clearInterval(etmRestaurant.localloding_IntervalID);
        connection_errors("Error -  C1 125");
    }
}
function getstoreinfo_fromlocal() {
    contact = '';
    opening_hours = '';
    if (localStorage.storeinfo) {
        json = JSON.parse(localStorage.storeinfo);
        contact += '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke" class="tab_contacts_info"><tbody>';
        contact += '<tr class="contacts_info"><td>Contacts</td></tr>';
        contact += '<tr><td>' + json['name'] + '</td></tr>';
        contact += '<tr><td>' + json['address'].replace(/(\r\n|\n\r|\r|\n)/g, "<br>") + '</td></tr>';
        contact += '<tr><td>' + json['postalcode'] + '</td></tr>';
        contact += '<tr><td>' + json['telephone'] + '</td></tr>';
        contact += '<tr><td>Email: ' + json['email'] + '</td></tr>';
        contact += '<tr><td>Website: ' + json['store_url'] + '</td></tr></tbody></table>';
        $('#contact').html(contact);
        $('#contact').trigger('create');
        if (json['store_times']) {
            opening_hours += '<table data-role="table" data-mode="columntoggle" class="ui-responsive table-stroke" class="tab_open_hours"><tbody>';
            opening_hours += '<tr class="open_hours"><td>Opening Hours</td><td>From</td><td>To</td></tr>';
            for (i in json['store_times']) {
                for (j in json['store_times'][i]) {
                    opening_hours += '<tr><td>' + i + '</td><td>' + json['store_times'][i][j].start + ' </td><td>   ' + json['store_times'][i][j].end + '</td></tr>';
                }
            }
            opening_hours += '</tbody></table>';
            $('#opening_hours').html(opening_hours);
            $('#opening_hours').trigger('create');
            $.mobile.changePage('#pageInfo');
        }
    }
}
function shipAddAddress() {
    sessionStorage.setItem("from_ship_page", "yes");
    $.mobile.changePage('#pageAddAddress');
}
