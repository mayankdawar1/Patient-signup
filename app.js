//<debug>
Ext.Loader.setPath({
    'Ext': '../../src'
});
//</debug>




Ext.define('User', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'name',     type: 'string' },
            { name: 'password', type: 'string' },
            { name: 'disabled', type: 'string' },
            { name: 'email',    type: 'string' },
        ]
    }
});

// Define our simple application
Ext.application({
    tablets.
    startupImage: {
        '320x460': 'resources/startup/Default.jpg', // Non-retina iPhone, iPod touch, and all Android devices
        '640x920': 'resources/startup/640x920.png', // Retina iPhone and iPod touch
        '640x1096': 'resources/startup/640x1096.png', // iPhone 5 and iPod touch (fifth generation)
        '768x1004': 'resources/startup/768x1004.png', //  Non-retina iPad (first and second generation) in portrait orientation
        '748x1024': 'resources/startup/748x1024.png', //  Non-retina iPad (first and second generation) in landscape orientation
        '1536x2008': 'resources/startup/1536x2008.png', // : Retina iPad (third generation) in portrait orientation
        '1496x2048': 'resources/startup/1496x2048.png' // : Retina iPad (third generation) in landscape orientation
    },

    isIconPrecomposed: false,
    icon: {
        57: 'resources/icons/icon.png',
        72: 'resources/icons/icon@72.png',
        114: 'resources/icons/icon@2x.png',
        144: 'resources/icons/icon@144.png'
    },
    
requires: [
        'Ext.form.*',
        'Ext.field.*',
        'Ext.Button',
        'Ext.Toolbar',

        'Ext.data.Store'
    ],

    launch: function() {
        // Get all the items for our form.
        var items = this.getFormItems(),
            config, form;

               config = {
            xtype: 'formpanel',
            items: items
        };
        if (Ext.os.deviceType == 'Phone') {
            form = Ext.Viewport.add(config);
        } else {
                       Ext.apply(config, {
                modal: true,
                height: '90%',
                width: '60%',
                centered: true,

                // Disable hideOnMaskTap so it cannot be hidden
                hideOnMaskTap: false
            });

            // Add it to the Viewport and show it.
            form = Ext.Viewport.add(config);
            form.show();
        }

        this.form = form;
    },

       getFormItems: function() {
        return [
            {
                xtype: 'fieldset',
                title: 'Patient sign up',
                instructions: 'Please enter the information above.',
                defaults: {
                    required: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'patient name',
                        label: 'Patient Name',
                        autoCapitalize: false
                    },
                  {
                        xtype: 'textfield',
                        name: 'username',
                        label: 'Username',
                        autoCapitalize: false
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: 'Password'
                    },
                   
                   {
                        xtype: 'emailfield',
                        name: 'email id',
                        label: 'Email'
                        
                    },
                    
                                           {
                xtype: 'fieldset',
                title: 'Blood group',
                items: [
                    {
                        xtype: 'selectfield',
                        name: 'options',
                        options: [
                            
                            {text: 'Another item', value: '2'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Address',
                items: [
                    {
                        xtype: 'textfield',
                        name: 'single_text',
                        clearIcon: true
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Single Toggle',
                items: [
                    {
                        xtype: 'togglefield',
                        name: 'single_toggle',
                        value: 1
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Single Slider',
                items: [
                    {
                        xtype: 'sliderfield',
                        name: 'single_slider',
                        value: 60
                    }
                ]
            },
            
            // Create a docked bottom toolbar which will contain buttons to trigger various functions in our formpanel.
            {
                xtype: 'toolbar',
                docked: 'bottom',
                scrollable: {
                    direction: 'horizontal',
                    directionLock: true
                },
                items: [
                    
                    {
                        text: 'Home',
                        ui: 'round',
                        scope: this,
                        handler: function() {
                            var form = this.form;


                            if (!form.user) {
                                // Create a date for the datepicker field
                                var date = new Date();
                                date.setMonth(4);
                                date.setYear(1989);
                                date.setDate(1);


                            }


                        }
                    },

                    {
                        text: 'Favourites/Bookmarks',
                        ui: 'round',
                        scope: this,
                        handler : function() {
                            var form = this.form;

                            form.load({
                                url: 'user.json',
                                waitMsg: 'Loading User...'
                            });
                        }
                    },

                    { xtype: 'spacer' },
                    {
                        text: 'Reset',

                        // Ensure the scope is 'this' so we have access to the global 'form' instance
                        scope: this,
                        handler: function() {
                            // Call the form.reset method
                            this.form.reset();
                        }
                    },
                    // the latest values from the formpanel.
                    {
                        text: 'Save',
                        ui: 'confirm',
                        scope: this,
                        handler: function() {
                            var form = this.form;

                            // Mask the form
                            form.setMasked({
                                xtype: 'loadmask',
                                message: 'Saving...'
                            });

                            // Put it inside a timeout so it feels like it is going to a server.
                            setTimeout(function() {
                                if (form.user) {
                                    // Call the updateRecord method of formpanel with the user record instance. This will update the user record
                                    // with the latest values.
                                    form.updateRecord(form.user, true);
                                }

                                                               form.setMasked(false);
                            }, 1000);
                        }
                    },

                    {
                        text: 'Submit',
                        ui: 'confirm',
                        scope: this,
                        handler: function() {
                            var form = this.form;

                            form.submit({
                                url: 'user.json',
                                waitMsg: 'Saving User...'
                            });
                        }
                    }
                ]
            }
        ];
    }
});

