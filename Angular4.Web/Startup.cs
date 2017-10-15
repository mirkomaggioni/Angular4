using System;
using System.IO;
using System.Reflection;
using System.Web.Http;
using Angular4.Web.Controllers.Api;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Newtonsoft.Json;
using Owin;

[assembly: OwinStartup(typeof(Angular4.Web.Startup))]

namespace Angular4.Web
{
	public class Startup
	{
		public void Configuration(IAppBuilder app)
		{
			var builder = new ContainerBuilder();

			var apiControllersAssembly = Assembly.GetAssembly(typeof(CustomersController));

			builder.RegisterApiControllers(apiControllersAssembly);

			var containerBuilder = builder.Build();

			var config = new HttpConfiguration
			{
				DependencyResolver = new AutofacWebApiDependencyResolver(containerBuilder)
			};

			config.MapHttpAttributeRoutes();

			config.Routes.MapHttpRoute(
				name: "DefaultApi",
				routeTemplate: "api/{controller}/{id}",
				defaults: new { id = RouteParameter.Optional }
			);

			app.UseWebApi(config);

		  string root = AppDomain.CurrentDomain.BaseDirectory;
		  var physicalFileSystem = new PhysicalFileSystem(Path.Combine(root, "src"));

		  var fileServerOptions = new FileServerOptions
		  {
		    RequestPath = PathString.Empty,
		    EnableDefaultFiles = true,
		    FileSystem = physicalFileSystem,
		    EnableDirectoryBrowsing = false
		  };

		  app.UseFileServer(fileServerOptions);

      var serializerSettings = config.Formatters.JsonFormatter.SerializerSettings;
			serializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
		}
	}
}
