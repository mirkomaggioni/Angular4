using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4.Core.DataLayer
{
    [Table("Attachments")]
    public class Attachment
    {
        public Guid Id { get; set; }
        public Guid? IdFileBlob { get; set; }
        [ForeignKey("IdFileBlob")]
        public virtual FileBlob FileBlob { get; set; }
        public string Name { get; set; }
        public double Size { get; set; }
    }
}
