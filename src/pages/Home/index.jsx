/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useHistory } from "react-router-dom";
import AlertHome from "../../components/AlertHome";
import Stories from "../../components/Stories";
import Bottom from "../../components/Bottom";
import Footer from "../../components/Footer";
import Head from "../../components/Head";
import Header from "../../components/Header";

import Articles from "./components/Articles";
import Currencys from "./components/Currencys";
import DownloadApp from "./components/DownloadApp";
import FeaturedGroups from "./components/FeaturedGroups";
import RichestPlayers from "./components/RichestPlayers";
import SocialNetworks from "./components/SocialNetworks";
import UserHome from "./components/UserHome";
import FriendsOnlineModal from "./components/FriendsOnlineModal";

import APIService from "../../services/APIService";
import Requests from "../../services/Requests";
import StoreContext from "../../store/Context";
import useInterval from "../../utils/useInterval";

import groupIcon from "../../assets/img/070.gif";
import ghostAvatar from "../../assets/img/ghost.png";

import { i18n } from "../../translate/i18n";

const Home = () => {
  const { config, user, setUser } = React.useContext(StoreContext);
  const history = useHistory();

  const [richestUsers, setRichestUsers] = React.useState([]);
  const [featuredGroups, setFeaturedGroups] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [newsSlider, setNewsSlider] = React.useState([]);
  const [friendsOnline, setOnlineFriends] = React.useState([]);

  const [showClientOptions, setShowClientOptions] = React.useState(false);

  const [isUserDataLoading, setIsUserDataLoading] = React.useState(true);
  const [richestUsersLoading, setRichestUsersLoading] = React.useState(true);
  const [isGroupLoading, setIsGroupLoading] = React.useState(true);
  const [isLoadingNews, setIsLoadingNews] = React.useState(true);
  const [isLoadingNewsSlider, setIsLoadingNewsSlider] = React.useState(true);
  const [openFriendOnlineModal, setFriendOnlineModal] = React.useState(false);

  const isMobile = window.screen.width <= 480;

  const getUser = () => {
    Requests.home
      .getUser()
      .then((response) => {
        if (APIService.isResponseAuthorized(response)) {
          setUser(response.data.user);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsUserDataLoading(false);
      });
  };

  const getRichestUsers = () => {
    Requests.home
      .getRichestUsers()
      .then((response) => {
        setRichestUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRichestUsersLoading(false);
      });
  };

  const getFeaturedGroups = () => {
    Requests.home
      .getFeaturedGroups()
      .then((response) => {
        setFeaturedGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsGroupLoading(false);
      });
  };

  const getNews = () => {
    Requests.home
      .getNews()
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingNews(false);
      });
  };

  const getNewsSlider = () => {
    Requests.home
      .getNewsSlider()
      .then((response) => {
        setNewsSlider(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingNewsSlider(false);
      });
  };

  const getOnlineFriends = () => {
    Requests.home
      .getOnlineFriends()
      .then((response) => {
        setOnlineFriends(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoadingNewsSlider(false);
      });
  };

  const loadingGroups = () => {
    const numbers = [1, 2, 3, 4, 5];

    return (
      <>
        {numbers.map((i) => (
          <div className="featured-groups-item flex" key={i}>
            <div className="featured-groups-badge mr-right-1 flex">
              <img src={`${groupIcon}`} className="float-left mr-auto" />
            </div>
            <label className="color-4 text-nowrap mr-auto-top-bottom">
              <h5 className="bold text-nowrap">...</h5>
              <h6 className="text-nowrap">... membros</h6>
            </label>
          </div>
        ))}
      </>
    );
  };

  const loadingRichestUsers = () => {
    const numbers = [1, 2, 3];

    return (
      <>
        {numbers.map((repeat, index) =>
          index === 0 ? (
            <div className="flex featured-user-credits">
              <div className="featured-user-credits-imager">
                <img alt={`...`} src={`${ghostAvatar}`} />
              </div>
              <label className="white margin-auto-top-bottom margin-auto-right padding-right-min">
                <Link
                  to={`/profile/...`}
                  place={`Perfil: ... - ${config.hotel.name}`}
                  className="no-link white"
                >
                  <h4 className="bold">Carregando..</h4>
                </Link>
                <div className="flex">
                  <icon name="credits"></icon>
                  <h6 className="margin-left-minm margin-auto-top-bottom">...</h6>
                </div>
              </label>
            </div>
          ) : index === 1 ? (
            <div className="flex featured-user-diamonds">
              <div className="featured-user-diamonds-imager">
                <img alt={`...`} src={`${ghostAvatar}`} />
              </div>
              <label className="white margin-auto-top-bottom margin-auto-right padding-right-min">
                <Link
                  to={`/profile/...`}
                  place={`Perfil: ... - ${config.hotel.name}`}
                  className="no-link white"
                >
                  <h4 className="bold">Carregando..</h4>
                </Link>
                <div className="flex">
                  <icon name="diamonds"></icon>
                  <h6 className="margin-left-minm margin-auto-top-bottom">...</h6>
                </div>
              </label>
            </div>
          ) : (
            <div className="flex featured-user-duckets">
              <div className="featured-user-duckets-imager">
                <img alt={`...`} src={`${ghostAvatar}`} />
              </div>
              <label className="white margin-auto-top-bottom margin-auto-right padding-right-min">
                <Link
                  to={`/profile/...`}
                  place={`Perfil: ... - ${config.hotel.name}`}
                  className="no-link white"
                >
                  <h4 className="bold">Carregando..</h4>
                </Link>
                <div className="flex">
                  <icon name="duckets"></icon>
                  <h6 className="margin-left-minm margin-auto-top-bottom">...</h6>
                </div>
              </label>
            </div>
          )
        )}
      </>
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      getUser();
    }, config.dev[0].timeout);

    setTimeout(() => {
      getRichestUsers();
    }, config.dev[0].timeout);

    setTimeout(() => {
      getFeaturedGroups();
    }, config.dev[0].timeout);

    setTimeout(() => {
      getNews();
    }, config.dev[0].timeout);

    setTimeout(() => {
      getNewsSlider();
    }, config.dev[0].timeout);

    setTimeout(() => {
      getOnlineFriends();
    }, config.dev[0].timeout);
  }, []);

  const goToClient = (client) => {
    if (client === "betav2") {
      setShowClientOptions(false);
      history.push("/client/betav2");
    } else if (client === "flash") {
      setShowClientOptions(false);
      history.push("/client/60");
    } else {
      history.push("/client/choose");
    }
  };

  const getClientButtons = () => {
    return (
      <React.Fragment>
        {showClientOptions ? (
          <>
            <Link
              onClick={() => goToClient("betav2")}
              className={`${config.cmsStyles.buttonsClass} no-link margin-top`}
              style={{ width: "180px", height: "42px", marginTop: "20px" }}
            >
              <label className="margin-auto white">
                <h5>{i18n.t("home.userDetails.buttons.beta")}</h5>
              </label>
            </Link>
            <Link
              onClick={() => goToClient("flash")}
              className={`${config.cmsStyles.buttonsClass} no-link margin-top`}
              style={{ width: "180px", height: "42px" }}
            >
              <label className="margin-auto white">
                <h5>{i18n.t("home.userDetails.buttons.flash")}</h5>
              </label>
            </Link>
          </>
        ) : (
          <>
            {/*onClick={() => setShowClientOptions(true)}*/}
            <a
              //onClick={() => setShowClientOptions(true)}
              href="/client/choose"
              className={`${config.cmsStyles.buttonsClass} no-link margin-top-md`}
              style={{ width: "180px", height: "42px", top: "30px" }}
            >
              <label className="margin-auto white">
                <h5>{i18n.t("home.userDetails.buttons.enter")}</h5>
              </label>
            </a>
          </>
        )}
      </React.Fragment>
    );
  };

  const handleOpenFriendOnlineModal = () => {
    setFriendOnlineModal(true);
  };
  const handleFriendOnlineModal = () => {
    setFriendOnlineModal(false);
  };

  useInterval(() => {
    getUser();
  }, 60000);

  return (
    <>
      <Head />
      <Header visited="home" />
      <FriendsOnlineModal
        open={openFriendOnlineModal}
        close={handleFriendOnlineModal}
        onlineFriends={friendsOnline}
      />
      {/*
                <Stories></Stories>
                */}
      <div className="webcenter flex-column">
        <AlertHome>{config.hotel.txtHome}</AlertHome>
        <div className="flex" style={isMobile ? { flexDirection: "column" } : {}}>
          <div className="col-7">
            <div className="display-habbo-me flex-column">
              <div
                className="display-myhabbo flex"
                style={{
                  backgroundImage: `url(${config.cmsStyles.cardHomeImage})`,
                }}
              >
                <div className="flex width-content">
                  <UserHome
                    isUserDataLoading={isUserDataLoading}
                    user={user}
                    config={config}
                    ghostAvatar={ghostAvatar}
                    getClientButtons={getClientButtons}
                  />
                </div>
              </div>

              <div className="display-habbo-currency flex">
                <Currencys isUserDataLoading={isUserDataLoading} user={user} />
              </div>
            </div>

            <div class="col-8 flex margin-top-min margin-right">
              <div
                class="event-box-default"
                style={{
                  background: `${config.cmsStyles.eventBox}`,
                }}
              >
                <div class="general-box-header-me flex">
                  <div class="general-box-header-me-icon">
                    <icon name="social" class="flex margin-auto"></icon>
                  </div>
                  {friendsOnline.length > 0 && (
                    <>
                      <label class="color-4 flex-column text-nowrap mr-auto-top-bottom">
                        <h4 class="bold text-nowrap white">{i18n.t("home.friendsOffline.title")}</h4>
                        <h6
                          class="text-nowrap white"
                          dangerouslySetInnerHTML={{
                            __html: i18n.t("home.friendsOnline.smallText", {
                              countMessage:
                                friendsOnline.length > 1
                                  ? `${friendsOnline.length} ${i18n.t(
                                      "home.friendsOnline.connectedFriendsPluralMessage"
                                    )}`
                                  : `${friendsOnline.length} ${i18n.t(
                                      "home.friendsOnline.connectedFriendsSingularMessage"
                                    )}`,
                            }),
                          }}
                        ></h6>
                      </label>
                      <button
                        className={`${config.cmsStyles.buttonsClass} no-link margin-top`}
                        style={{
                          width: "115px",
                          height: "42px",
                          top: "8px",
                          left: "85px",
                        }}
                        onClick={() => handleOpenFriendOnlineModal()}
                      >
                        <label className="margin-auto white">
                          <h5>{i18n.t("home.friendsOnline.button")}</h5>
                        </label>
                      </button>
                    </>
                  )}
                  {friendsOnline.length <= 0 && (
                    <>
                      <label class="color-4 flex-column text-nowrap mr-auto-top-bottom">
                        <h4 class="bold text-nowrap white">{i18n.t("home.friendsOffline.title")}</h4>
                        <h6
                          class="text-nowrap white"
                          style={isMobile ? { maxWidth: "72vw" } : {}}
                          dangerouslySetInnerHTML={{
                            __html: i18n.t("home.friendsOffline.smallText"),
                          }}
                        ></h6>
                      </label>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Amigos OFFLINE }
                            
                            <div class="event-box-default" style={{background: `linear-gradient(to right, rgb(104 60 136) 51%, rgba(0, 0, 0, 0)), url(https://i.imgur.com/Uxtss5o.png) right center no-repeat` }}>
                                <div class="general-box-header-me flex"> 
                                    <div class="general-box-header-me-icon"    >
                                <icon name="social" class="flex margin-auto"></icon>
                                          </div>
                                <label class="color-4 flex-column text-nowrap mr-auto-top-bottom">
                                  <h4 class="bold text-nowrap white">{i18n.t('home.friendsOffline.title')}</h4>
                                <h6 class="text-nowrap white">{i18n.t('home.friendsOffline.smallText')}</h6>
                                </label>
                            </div>
                                    </div>    
                                    */}

            <div className="col-9 flex margin-top-min">
              <div className="general-box featured-users margin-top-min margin-right-min">
                <div className="general-header-box-2 flex hbg-1">
                  <div className="flex margin-auto-top-bottom margin-right-min">
                    <icon name="gold-trophy" className="margin-auto"></icon>
                  </div>
                  <label className="white">
                    <h5>{i18n.t("home.richestPlayers.title")}</h5>
                  </label>
                </div>
                <div className="flex-column users-featured">
                  <RichestPlayers
                    loadingRichestUsers={loadingRichestUsers}
                    richestUsersLoading={richestUsersLoading}
                    richestUsers={richestUsers}
                    creditsText={i18n.t("home.richestPlayers.currencys.type.credits")}
                    diamondsText={i18n.t("home.richestPlayers.currencys.type.diamonds")}
                    ducketsText={i18n.t("home.richestPlayers.currencys.type.duckets")}
                    config={config}
                  />
                </div>
              </div>
              <div className="general-box featured-rooms margin-top-min">
                <div className="general-header-box-2 flex hbg-2">
                  <div className="flex margin-auto-top-bottom margin-right-min">
                    <icon name="room" className="margin-auto"></icon>
                  </div>
                  <label className="white">
                    <h5>{i18n.t("home.featuredGroup.title")}</h5>
                  </label>
                </div>
                <FeaturedGroups
                  isGroupLoading={isGroupLoading}
                  loadingGroups={loadingGroups}
                  featuredGroups={featuredGroups}
                  membersText={i18n.t("home.featuredGroup.members")}
                  config={config}
                />
              </div>
            </div>
            <DownloadApp
              titleText={i18n.t("home.downloadApp.title")}
              windowsText={i18n.t("home.downloadApp.downloads.windows")}
              macOSText={i18n.t("home.downloadApp.downloads.macOS")}
              config={config}
            />
          </div>
          <div className={`flex-column${!isMobile ? " col-10" : " margin-top-min"}`}>
            <div className="general-box last-articles-slider width-content pd-none overflow-hidden">
              <Articles
                isLoadingNews={isLoadingNews}
                news={news}
                isLoadingNewsSlider={isLoadingNewsSlider}
                newsSlider={newsSlider}
              />
            </div>
            <SocialNetworks
              titleText={i18n.t("home.socialNetworks.title")}
              facebookText={i18n.t("home.socialNetworks.facebook")}
              instagramText={i18n.t("home.socialNetworks.instagram")}
              twitterText={i18n.t("home.socialNetworks.twitter")}
              discordText={i18n.t("home.socialNetworks.discord")}
              config={config}
            />
            <div className="get-badges-box">
              <h4 style={{ color: "white", fontWeight: "bold", top: "5px", left: "10px" }}>
                {" "}
                Recompensa Grátis{" "}
              </h4>
              <h5 style={{ color: "#c3bebe", top: "10px", left: "10px" }}>
                {" "}
                Não há recompensas disponiveis no momento.
              </h5>
              <button
                className="green-button-1 flex"
                type="submit"
                style={{ width: "285px", height: "40px", top: "80px", left: "8px", position: "absolute" }}
                disabled
              >
                <label className="color-1 mr-auto pointer-none">
                  <h5 className="uppercase bold">Pegar recompensa</h5>
                </label>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Bottom />
    </>
  );
};

export default Home;
