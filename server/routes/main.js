define(['routes/page'], function (page) {
	return function (app) {
		//Page preview
		app.get("/", page.renderPageList);
		app.get("/:page", page.renderPagePreview);

	};
});