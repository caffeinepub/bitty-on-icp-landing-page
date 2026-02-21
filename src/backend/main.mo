import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import OutCall "http-outcalls/outcall";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import Blob "mo:core/Blob";
import Float "mo:core/Float";

actor {
  type NewsUpdate = {
    id : Nat;
    title : Text;
    content : Text;
    timestamp : Int;
  };

  type UserProfile = {
    name : Text;
  };

  type WalletBalance = {
    currency : Text;
    balance : Float;
  };

  type TokenMetric = {
    price : ?Float;
    marketCap : ?Float;
    volume : ?Float;
    lastUpdated : Int;
    status : Text;
  };

  type TokenMetricsResponse = {
    price : ?Float;
    marketCap : ?Float;
    volume : ?Float;
  };

  type ICRC1 = actor {
    icrc1_balance_of : shared ({ owner : Blob; subaccount : ?Blob }) -> async Nat;
  };

  type ICRC2 = actor {
    icrc1_balance_of : shared ({ owner : Blob; subaccount : ?Blob }) -> async Nat;
  };

  let accessControlState = AccessControl.initState();

  var newsUpdates : Map.Map<Nat, NewsUpdate> = Map.fromIter<Nat, NewsUpdate>([
    (0, {
      id = 0;
      title = "DEC 27, 2025";
      content = "WEBPAGE & GAMES\n- New leaderboard system\n- Updated to version 2.0 Roadmap\n- Cleaned up webpage";
      timestamp = Time.now();
    }),
    (1, {
      id = 1;
      title = "DEC 21, 2025";
      content = "WEBPAGE & GAMES\n- New leaderboard system\n- Internet Identity sign in for Wallet";
      timestamp = Time.now();
    }),
    (2, {
      id = 2;
      title = "DEC 18, 2025";
      content = "Domain purchased\n- Live Chart added to webpage\n- Updates to cleanliness of webpage\n- New features (new feature meme and font changes)\n- Partnerships added\n- New Tab for Future\"BITTY BLING\"";
      timestamp = Time.now();
    }),
    (3, {
      id = 3;
      title = "DEC 18, 2025";
      content = "BITTY DUCK BLAST Updates\n- New leaderboard system implemented with enhanced scoring mechanics\n- Improved game performance and reduced loading times\n- Added special holiday-themed power-ups for December\nWebsite Enhancement\n- Enhanced news synchronization system for real-time updates\n- Improved carousel navigation with smoother transitions\n- Optimized backend data delivery for faster loading";
      timestamp = Time.now();
    }),
    (4, {
      id = 4;
      title = "DEC 3, 2025";
      content = "YOUTUBE LINK\n- A link has been added to the website for the YouTube channel. This is where AMA events will happen and videos of the project.\nMEME PAGE UPDATED\n- Meme page has now been updated to enhance community engagement. The never-ending competition is now live.";
      timestamp = Time.now();
    }),
    (5, {
      id = 5;
      title = "NOV 28, 2025";
      content = "\"Bitty Duck Blast\" Updates\n- Accuracy improved\n- Leaderboards changed to IC address (ensuring honest rewards in future tournaments)\nBITTY ON ICP Meme Page\n- Launch enhances community engagement and provides a fun place for $BITTYICP memes\n- \"Featured\" Memes are chosen randomly by the team and hold bragging rights\nWebsite Updates\n- Removed floating news/updates tab and integrated the section into the main page\n- Added Meme Page link with new dropdown tabs";
      timestamp = Time.now();
    }),
    (6, {
      id = 6;
      title = "NOV 18, 2025";
      content = "Website updates\n- Added live Chart\n- Domain purchased\n- Added new website features and tab\n- Live token Data";
      timestamp = Time.now();
    }),
  ].values());

  var nextNewsUpdateId = 7;
  var userProfiles = Map.empty<Principal, UserProfile>();
  var cachedMetrics = Map.empty<Text, TokenMetric>();

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addNewsUpdate(title : Text, content : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add news updates");
    };

    let newsUpdate : NewsUpdate = {
      id = nextNewsUpdateId;
      title;
      content;
      timestamp = Time.now();
    };

    newsUpdates.add(nextNewsUpdateId, newsUpdate);
    nextNewsUpdateId += 1;
    newsUpdate.id;
  };

  public query ({ caller }) func getNewsUpdate(id : Nat) : async ?NewsUpdate {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    newsUpdates.get(id);
  };

  public query ({ caller }) func getAllNewsUpdates() : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    let sortedValues = newsUpdates.values().toArray().sort(
      func(a, b) {
        Int.compare(b.timestamp, a.timestamp);
      }
    );
    sortedValues;
  };

  public query ({ caller }) func getNewsUpdatesPaginated(page : Nat, pageSize : Nat) : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    let totalUpdates = newsUpdates.size();
    if (totalUpdates == 0) {
      return [];
    };

    let start = page * pageSize;
    let end = if (start + pageSize > totalUpdates) {
      totalUpdates;
    } else {
      start + pageSize;
    };

    var current = 0;
    let newsUpdatesList = List.empty<NewsUpdate>();
    for (newsUpdate in newsUpdates.values()) {
      if (current >= start and current < end) {
        newsUpdatesList.add(newsUpdate);
      };
      current += 1;
    };

    newsUpdatesList.toArray();
  };

  public query ({ caller }) func getNewsUpdatesByDateRange(startDate : Int, endDate : Int) : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    let filteredUpdates = newsUpdates.values().filter(
      func(newsUpdate) {
        newsUpdate.timestamp >= startDate and newsUpdate.timestamp <= endDate
      }
    );
    filteredUpdates.toArray();
  };

  public query ({ caller }) func getSortedNewsUpdates() : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    newsUpdates.values().toArray();
  };

  public query ({ caller }) func getNewsUpdatesByTitle(title : Text) : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    let filteredUpdates = newsUpdates.values().filter(
      func(newsUpdate) {
        newsUpdate.title.contains(#text(title));
      }
    );
    filteredUpdates.toArray();
  };

  public query ({ caller }) func getNewsUpdatesByContent(content : Text) : async [NewsUpdate] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access news updates");
    };
    let filteredUpdates = newsUpdates.values().filter(
      func(newsUpdate) {
        newsUpdate.content.contains(#text(content));
      }
    );
    filteredUpdates.toArray();
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  func fetchDexscreenerMetrics() : async ?TokenMetricsResponse {
    let url = "https://api.dexscreener.io/latest/dex/pairs/icp/wkyqn-qqaaa-aaaar-qbyxq-cai";
    try {
      ignore await OutCall.httpGetRequest(url, [], transform);
      null;
    } catch (_) {
      null;
    };
  };

  func computeDexscreenerMetrics() : async TokenMetric {
    let currentTimeNs = Time.now();
    let cacheKey = "wkyqn-qqaaa-aaaar-qbyxq-cai";

    switch (cachedMetrics.get(cacheKey)) {
      case (?cachedValue) {
        if (currentTimeNs - cachedValue.lastUpdated <= 30_000_000_000 and cachedValue.status == "success") {
          return cachedValue;
        };
      };
      case (null) {};
    };

    switch (await fetchDexscreenerMetrics()) {
      case (?apiResponse) {
        let newMetrics : TokenMetric = {
          price = apiResponse.price;
          marketCap = apiResponse.marketCap;
          volume = apiResponse.volume;
          lastUpdated = currentTimeNs;
          status = "success";
        };
        cachedMetrics.add(cacheKey, newMetrics);
        newMetrics;
      };
      case (null) {
        let fallbackMetrics = switch (cachedMetrics.get(cacheKey)) {
          case (?cachedValue) { cachedValue };
          case (null) {
            {
              price = null;
              marketCap = null;
              volume = null;
              lastUpdated = currentTimeNs;
              status = "fallback";
            };
          };
        };
        fallbackMetrics;
      };
    };
  };

  public shared ({ caller }) func getTokenMetrics() : async TokenMetric {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access token metrics");
    };
    await computeDexscreenerMetrics();
  };

  public shared ({ caller }) func getLiveWalletBalances(owner : Blob, subaccount : ?Blob, currency : Text) : async Nat {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous principals cannot access wallet balances");
    };

    let callerBlob = caller.toBlob();

    if (callerBlob != owner and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: You can only access your own wallet balance");
    };

    switch (currency) {
      case ("BTC") {
        await getICRC2Balances(owner, subaccount);
      };
      case ("BITTY") {
        await getICRC1Balances(owner, subaccount);
      };
      case (_) {
        0;
      };
    };
  };

  func getICRC1Balances(owner : Blob, subaccount : ?Blob) : async Nat {
    let icrc1Canister : ICRC1 = actor ("2ou2e-jaaaa-aaaaq-aabmq-cai");
    let balance = await icrc1Canister.icrc1_balance_of({ owner; subaccount });
    balance;
  };

  func getICRC2Balances(owner : Blob, subaccount : ?Blob) : async Nat {
    let icrc2Canister : ICRC2 = actor ("qvhfx-5qaaa-aaaar-qaflq-cai");
    let balance = await icrc2Canister.icrc1_balance_of({ owner; subaccount });
    balance;
  };
};
