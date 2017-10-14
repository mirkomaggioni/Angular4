using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4.Core.DataLayer
{
    [Table("Cities")]
    public class City
    {
        public Guid Id { get; set; }
        public Guid IdDistrict { get; set; }
        [ForeignKey("IdDistrict")]
        public virtual District District { get; set; }
        public string Name { get; set; }
        public int Zip { get; set; }
    }
}
