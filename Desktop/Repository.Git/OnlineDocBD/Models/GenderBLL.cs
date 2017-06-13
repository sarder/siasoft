using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace OnlineDocBD.Models
{
    [DataContract]
    public class GenderBLL
    {
        OnlineDOCbdEntities db = new OnlineDOCbdEntities();
        [DataMember]
        public List<GENDER> GenderList { get; set; }
    }
}