﻿using System.Data.Entity;

namespace Angular4.Core.DataLayer
{
    public class Context : DbContext
    {
        public Context() : base() { }
        public DbSet<District> Districts { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<FileBlob> FileBlobs { get; set; }
    }
}
