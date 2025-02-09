jQuery( document ).ready( function( $ ) {
	'use strict';

	var renewals_field = document.querySelector( '.subscription_coupon_trial_length_field' ),
		$renewals_field = $( renewals_field ),
		coupon_amount_field = document.querySelector( '.coupon_amount_field' ),
		$coupon_amount_field = $( coupon_amount_field );

	/**
	 * Subscription coupon actions.
	 * @type {{init: function, type_options: function, move_field: function}}
	 */
	var wcs_meta_boxes_coupon_actions = {

		/**
		 * Initialize variation actions.
		 */
		init: function() {

			if ( renewals_field ) {
				$( document.getElementById( 'discount_type' ) ).on( 'change', this.type_options ).change();
				this.move_field();
			}						
		},

		/**
		 * Show/hide fields by coupon type options.
		 */
		type_options: function() {
			var select_val = $( this ).val();

			switch ( select_val ) {
				case 'subscription_trial':
					$renewals_field.show();
					$coupon_amount_field.hide();  // Hide the coupon amount field for subscription trial
					break;

				//case 'recurring_fee':
				//case 'recurring_percent':
				case 'sign_up_fee':
				case 'sign_up_fee_percent':
					$renewals_field.show();
					$coupon_amount_field.show();  // Show the coupon amount field for other types
					break;

				default:
					$renewals_field.hide();
					$coupon_amount_field.show();  // Show the coupon amount field by default
					break;
			}
		},

		/**
		 * Move the renewal form field in the DOM to a better location.
		 */
		move_field: function() {
			var parent = document.getElementById( 'general_coupon_data' ),
				shipping = parent.querySelector( '.free_shipping_field' );

			parent.insertBefore( renewals_field, shipping );
		}
	};

	wcs_meta_boxes_coupon_actions.init();
});
