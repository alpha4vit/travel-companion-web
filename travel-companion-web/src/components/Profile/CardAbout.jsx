import React from 'react';

const CardAbout = () => {
    return (
            <div className="col-xl-4">
                <div className="card">
                    <div className="card-body">
                        <div className="pb-2">
                            <h4 className="card-title mb-3">About</h4>
                            <p>Hi I'm Jansh, has been the industry's standard dummy text To an English
                                person, it will seem like
                                simplified.</p>
                            <ul className="ps-3 mb-0">
                                <li>it will seem like simplified.</li>
                                <li>To achieve this, it would be necessary to have uniform pronunciation</li>
                            </ul>
                        </div>
                        <hr/>
                        <div className="pt-2">
                            <h4 className="card-title mb-4">My Skill</h4>
                            <div className="d-flex gap-2 flex-wrap">
                                <span className="badge badge-soft-secondary p-2">HTML</span>
                                <span className="badge badge-soft-secondary p-2">Bootstrap</span>
                                <span className="badge badge-soft-secondary p-2">Scss</span>
                                <span className="badge badge-soft-secondary p-2">Javascript</span>
                                <span className="badge badge-soft-secondary p-2">React</span>
                                <span className="badge badge-soft-secondary p-2">Angular</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div>
                            <h4 className="card-title mb-4">Personal Details</h4>
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <tbody>
                                    <tr>
                                        <th scope="row">Name</th>
                                        <td>Jansh Wells</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location</th>
                                        <td>California, United States</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Language</th>
                                        <td>English</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Website</th>
                                        <td>abc12@probic.com</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div>
                            <h4 className="card-title mb-4">Work Experince</h4>
                            <ul className="list-unstyled work-activity mb-0">
                                <li className="work-item" data-date="2020-21">
                                    <h6 className="lh-base mb-0">ABCD Company</h6>
                                    <p className="font-size-13 mb-2">Web Designer</p>
                                    <p>To achieve this, it would be necessary to have uniform grammar, and more
                                        common words.</p>
                                </li>
                                <li className="work-item" data-date="2019-20">
                                    <h6 className="lh-base mb-0">XYZ Company</h6>
                                    <p className="font-size-13 mb-2">Graphic Designer</p>
                                    <p className="mb-0">It will be as simple as occidental in fact, it will be
                                        Occidental person, it will seem like simplified.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CardAbout;