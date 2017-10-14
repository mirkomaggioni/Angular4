using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4.Core.DataLayer
{
    [Table("Districts")]
    public class District
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
    }
}
