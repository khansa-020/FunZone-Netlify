import React from "react";
import "../middle/middleside.css";
// import img1 from '../../images/profile-8.jpg';
// import img2 from '../../images/profile-10.jpg';
// import img3 from '../../images/profile-12.jpg';
// import img4 from '../../images/profile-1.jpg';
// import img5 from '../../images/profile-13.jpg';
// import img6 from '../../images/profile-4.jpg';
// import img7 from '../../images/profile-15.jpg';
// import img8 from '../../images/feed-1.jpg';
// import img9 from '../../images/feed-2.jpg';
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import { useSelector } from "react-redux";
const MiddleSide = () => {
  return (
    <div class="middle">
      <PostShare />
      <Posts />
      {/* <!-- ---STORIES--- --> */}
      {/* <div class="stories">
               <div class="story">
                   <div class="profile-picture">
                       <img src={img1} alt=''/>
                   </div>
                   <p class="name">Your Story</p>
               </div>

               <div class="story">
                <div class="profile-picture">
                    <img src={img3} alt=''/>
                </div>
                <p class="name">ABC</p>
                </div>

                <div class="story">
                    <div class="profile-picture">
                        <img src={img2} alt=''/>
                    </div>
                    <p class="name">Your Story</p>
                </div>

                <div class="story">
                    <div class="profile-picture">
                        <img src={img1} alt=''/>
                    </div>
                    <p class="name">Your Story</p>
                </div>

                <div class="story">
                    <div class="profile-picture">
                        <img src={img1} alt=''/>
                    </div>
                    <p class="name">Your Story</p>
                </div>

                <div class="story">
                    <div class="profile-picture">
                        <img src={img1} alt=''/>
                    </div>
                    <p class="name">Your Story</p>
                </div>

           </div> */}

      {/* <!-- ---------------END OF STORIES----------- --> */}
      {/* <form className="create-post">
    <div class="profile-picture">
    <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="profileImg"/>
               
    </div>
    <input type="text" placeholder="What's on your mind, Ken?" id="create-post"/>
    <input type="submit" value="Post" class="butn butn-primary"></input>
</form> */}

      {/* <!-- -----FEEDS----- --> */}
      {/* <div class="feeds"> */}
      {/* <!-- -----Individual FEED----- --> */}
      {/* <div class="feed">
        <div class="head">
            <div class="user">
                <div class="profile-picture">
                <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="profileImg"/>
                </div>
                <div class="info">
                    <h3>Lana Rose</h3>
                    <small>Dubai, 15 MINUTES AGO</small>
                </div>
                
            </div>
            <span class="edit">
                <i class="uil uil-ellipsis-h"></i>
            </span>
        </div>

        <div class="photo">
            <img src={img8} alt=""/>
        </div>

        <div class="action-buttons">
            <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i></span>
                <span><i class="uil uil-comment"></i></span>
                <span><i class="uil uil-share-alt"></i></span>
            </div>
            <div class="bookmark">
                <span><i class="uil uil-bookmark-full"></i></span>
            </div>
        </div>
        <div class="liked-by">
            <span><img src={img2} alt=''/></span>
            <span><img src={img6} alt=''/></span>
            <span><img src={img7} alt=''/></span>
            <p>Liked by <b>Ernest Achiever</b> and <b>2,323 others</b></p>
        </div>

        <div class="caption">
            <p><b>Lana Rorese</b> Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="comments text-muted">
            View all 277 comments
        </div>
    </div>

    <div class="feed">
        <div class="head">
            <div class="user">
                <div class="profile-picture">
                    <img src={img7} alt=''/>
                </div>
                <div class="info">
                    <h3>Lana Rose</h3>
                    <small>Dubai, 15 MINUTES AGO</small>
                </div>
                
            </div>
            <span class="edit">
                <i class="uil uil-ellipsis-h"></i>
            </span>
        </div>

        <div class="photo">
            <img src={img9} alt=""/>
        </div>

        <div class="action-buttons">
            <div class="interaction-buttons">
                <span><i class="uil uil-heart"></i></span>
                <span><i class="uil uil-comment"></i></span>
                <span><i class="uil uil-share-alt"></i></span>
            </div>
            <div class="bookmark">
                <span><i class="uil uil-bookmark-full"></i></span>
            </div>
        </div>
        <div class="liked-by">
            <span><img src={img2} alt=''/></span>
            <span><img src={img6} alt=''/></span>
            <span><img src={img7} alt=''/></span>
            <p>Liked by <b>Ernest Achiever</b> and <b>2,323 others</b></p>
        </div>

        <div class="caption">
            <p><b>Lana Rorese</b> Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <div class="comments text-muted">
            View all 277 comments
        </div>
    </div> */}

      {/* <!-- -----End of Individual FEED----- --> */}
      {/* </div> */}
      {/* <!-- -----End of FEEDS----- --> */}
    </div>
  );
};

export default MiddleSide;
