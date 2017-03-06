using AngularJsWithBladeDAL.UnitOfWork;
using AngularJsWithBladeModels.Models;
using Kovai.ServiceBus360.Common.Countries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SimpleBlogWebApi.Controllers
{
    public class universityController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;

        public universityController()
        {
            _unitOfWork = new UnitOfWork();
        }

        [HttpGet]
        [Route("api/Countries")]
        public async Task<List<Country>> GetCountries()
        {
            return await Task.Run(() => CountryModel.GetCountries());
        }

        [HttpGet]
        [Route("api/Universities")]
        public async Task<List<University>> GetUniversityList()
        {
            return await _unitOfWork.UniversityRepository.GetUniversityList();
        }

        [HttpGet]
        [Route("api/University/Details/Courses/{id}")]
        public async Task<University> GetUniversityDetailsByCourseId(Guid id)
        {
            var course = await _unitOfWork.CourseRepository.GetCourseById(id);
            return await _unitOfWork.UniversityRepository.GetUniversityById(course.UniversityId);
        }

        [HttpGet]
        [Route("api/Universities/Details/{id}")]
        public async Task<University> GetUniversityDetailsById(Guid id)
        {
            return await _unitOfWork.UniversityRepository.GetUniversityById(id);
        }

        [HttpPost]
        [Route("api/Universities/Add")]
        public async Task<University> CreateUniversity(University University)
        {
            var univ = _unitOfWork.UniversityRepository.AddUniversity(University);
            await _unitOfWork.SaveChangesAsync();
            return univ;
        }

        [HttpPost]
        [Route("api/Universities/Update")]
        public async Task<bool> UpdateUniversity(University _course)
        {
            _unitOfWork.UniversityRepository.UpdateUniversity(_course);
            return await _unitOfWork.SaveChangesAsync();
        }

        [HttpGet]
        [Route("api/Universities/Delete/{id}")]
        public async Task<bool> DeleteUniversityById(Guid id)
        {
            var courses = await _unitOfWork.CourseRepository.GetCourseListByUniversityId(id);
            foreach (var course in courses)
            {
                _unitOfWork.StudentRepository.DeleteStudentsByCourseId(course.Id);
                _unitOfWork.CourseRepository.DeleteCourseById(course.Id);
            }
            _unitOfWork.UniversityRepository.DeleteUniversityById(id);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}