/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var App = require('app');
require('views/main/service/info/summary');

describe('App.MainServiceInfoSummaryView', function() {

  var mainServiceInfoSummaryView = App.MainServiceInfoSummaryView.create({
    monitorsLiveTextView: Em.View.create(),
    controller: Em.Object.create({
      content: Em.Object.create({
        id: 'HDFS',
        serviceName: 'HDFS',
        hostComponents: []
      })
    })
  });

  describe('#servers', function () {
    it('services shuldn\'t have servers except FLUME and ZOOKEEPER', function () {
      expect(mainServiceInfoSummaryView.get('servers')).to.be.empty;
    });

    it('if one server exists then first server should have isComma and isAnd property false', function () {
      mainServiceInfoSummaryView.set('controller.content', Em.Object.create({
        id: 'ZOOKEEPER',
        serviceName: 'ZOOKEEPER',
        hostComponents: [
          Em.Object.create({
            displayName: '',
            isMaster: true
          })
        ]
      }));
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isComma).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isAnd).to.equal(false);
    });

    it('if more than one servers exist then first server should have isComma - true and isAnd - false', function () {
      mainServiceInfoSummaryView.set('controller.content', Em.Object.create({
        id: 'ZOOKEEPER',
        serviceName: 'ZOOKEEPER',
        hostComponents: [
          Em.Object.create({
            displayName: '',
            isMaster: true
          }),
          Em.Object.create({
            displayName: '',
            isMaster: true
          })
        ]
      }));
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isComma).to.equal(true);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isAnd).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(1).isComma).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(1).isAnd).to.equal(false);
    });

    it('if more than two servers exist then second server should have isComma - false and isAnd - true', function () {
      mainServiceInfoSummaryView.set('controller.content', Em.Object.create({
        id: 'ZOOKEEPER',
        serviceName: 'ZOOKEEPER',
        hostComponents: [
          Em.Object.create({
            displayName: '',
            isMaster: true
          }),
          Em.Object.create({
            displayName: '',
            isMaster: true
          }),
          Em.Object.create({
            displayName: '',
            isMaster: true
          })
        ]
      }));
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isComma).to.equal(true);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(0).isAnd).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(1).isComma).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(1).isAnd).to.equal(true);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(2).isComma).to.equal(false);
      expect(mainServiceInfoSummaryView.get('servers').objectAt(2).isAnd).to.equal(false);
    });

  });
});
