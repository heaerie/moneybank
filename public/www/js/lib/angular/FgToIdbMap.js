

			sjson

				\------------Page
							|------container ---- entitlePage -- EDIT|NEW|DELETE|VIEW|SAVE|ADD[views]
							|		|
							|		\-------Mode ----Table/container
							|
							\------collection --- entitlePage--->EDIT|NEW|DELETE|VIEW|SAVE|ADD 
									|
									\---- Mode-> Table/container

		sjson
			\-----generateMapper
					|
					\---- Map ->EDIT|NEW|DELETE|VIEW|SAVE|ADD[Maps]




entitlements are edit|Delete|Add

Container :
 {function:'I', pageType: 'crit' ,schemaJson:'schemaJson.json', userDetails:{}, json: {} }
view[readonly]

    0 Records
	+---------------------------------------------------------------+
	| title                                                 New     |  { Function: A ,pageType: 'crit', schemaJson : "NewSchema.json", json:{ ""} , userDetails: {} }
    +---------------------------------------------------------------+
	
	1 Record
	+---------------------------------------------------------------+ 
	| title                                             Edit|Delete |  {function : 'M', pageType :'CRIT'}
	+---------------------------------------------------------------+
	|                                                               |
	|                                                               |
	+---------------------------------------------------------------+

New [editable]
	+---------------------------------------------------------------+
	| title                                           Add |cancel   |  {function :'A', pageType: 'DTIL'}
	+---------------------------------------------------------------+
	|                                                               |
	|                                                               |
	+---------------------------------------------------------------+

Edit[editable]
	
	+---------------------------------------------------------------+
	| title                                         Save |cancel    |  {function : 'M' , pageType:'DTIL' }
	+---------------------------------------------------------------+
	|                                                               |
	|                                                               |
	+---------------------------------------------------------------+