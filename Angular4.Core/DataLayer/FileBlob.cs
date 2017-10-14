using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Angular4.Core.DataLayer
{
    [Table("FileBlobs")]
    public class FileBlob
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public byte[] File  { get; set; }
    }
}
