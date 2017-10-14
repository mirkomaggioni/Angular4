using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Angular4.Core.DataLayer;

namespace Angular4.Web.Controllers.Api
{
    public class CitiesController : ApiController
    {
		private readonly Context _db = new Context();

        // GET: api/Cities
        public IEnumerable<City> GetCities(string query)
        {
            return _db.Cities.OrderBy(d => d.Name);
		}
    }
}