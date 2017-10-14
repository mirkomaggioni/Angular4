﻿using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Angular4.Core.DataLayer;

namespace Angular4.Web.Controllers.Api
{
    public class CustomersController : ApiController
    {
        private readonly Context _db = new Context();

        // GET: api/Customers
        public IQueryable<Customer> GetCustomers()
        {
            return _db.Customers.Include(c => c.City).OrderBy(c => c.Name);
        }

        // GET: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult GetCustomer(Guid id)
        {
            var customer = _db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomer(Guid id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Id)
            {
                return BadRequest();
            }

            if (customer.City != null)
            {
                _db.Entry(customer.City).State = EntityState.Unchanged;
            }

            _db.Entry(customer).State = EntityState.Modified;

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public IHttpActionResult PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (customer.Id == Guid.Empty)
            {
                customer.Id = Guid.NewGuid();
            }

            if (customer.City != null)
            {
                _db.Entry(customer.City).State = EntityState.Unchanged;
            }

            _db.Customers.Add(customer);

            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (CustomerExists(customer.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public IHttpActionResult DeleteCustomer(Guid id)
        {
            Customer customer = _db.Customers.Find(id);
            if (customer == null)
            {
                return NotFound();
            }

            _db.Customers.Remove(customer);
            _db.SaveChanges();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(Guid id)
        {
            return _db.Customers.Count(e => e.Id == id) > 0;
        }
    }
}